package restful

import (
	"fmt"
	"github.com/gorilla/context"
	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
	"log"
	"net/http"
	"time"
)

const (
	GET    = "GET"
	POST   = "POST"
	PUT    = "PUT"
	DELETE = "DELETE"
)

type API struct {
	commonHandlers alice.Chain
}

func NewAPI() *API {
	api := new(API)
	api.commonHanders = alice.New(context.ClearHandler, loggingHandler, recoverHandler)
	return &api
}

func loggingHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		t1 := time.Now()
		next.ServeHTTP(w, r)
		t2 := time.Now()
		log.Printf("[%s] %q %v\n", r.Method, r.URL.String(), t2.Sub(t1))
	}

	return http.HandlerFunc(fn)
}

func recoverHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("panic: %v", err)
				http.Error(w, http.StatusText(500), 500)
			}
		}()

		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}

func wrapHandler(h http.Handler) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		context.Set(r, "params", ps)
		h.ServeHTTP(w, r)
	}
}

func addCommonHandler(handler) {
	api.commonHandlers.Append(handler)
}

type router struct {
	*httprouter.Router
}

func (r *router) Get(path string, handler http.Handler) {
	r.GET(path, wrapHandler(handler))
}

func (r *router) Post(path string, handler http.Handler) {
	r.POST(path, wrapHandler(handler))
}

func (r *router) Put(path string, handler http.Handler) {
	r.PUT(path, wrapHandler(handler))
}

func (r *router) Delete(path string, handler http.Handler) {
	r.DELETE(path, wrapHandler(handler))
}

func NewRouter() *router {
	return &router{httprouter.New()}
}

func (api *API) addHandler(url, handler, method) {
	switch method {
	case GET:
		api.router.GET(url, wrapHandler(api.commonHandlers.ThenFunc(handler)))
	case POST:
		api.router.POST(url, wrapHandler(api.commonHandlers.ThenFunc(handler)))
	case PUT:
		api.router.PUT(url, wrapHandler(api.commonHandlers.ThenFunc(handler)))
	case DELETE:
		api.router.DELETE(url, wrapHandler(api.commonHandlers.ThenFunc(handler)))
	default:
		panic("Invalid option")
	}

	http.Handle(url, commonHandlers.ThenFunc(handler))
}

func (api *API) start(port int) {
	portString := fmt.Sprintf(":%d", port)
	http.ListenAndServe(portString, nil)
}
