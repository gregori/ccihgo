package db

type Model interface {
	Create(model *Model) (*Model, error)
	SelectAll() ([]Model, error)
	Select(id int) (*Model, error)
	SelectByFilter(filter string)
	Delete(id int) (*Model, error)
	Update(model *Model) (*Model, error)
}
