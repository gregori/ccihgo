package model

import (
	"errors"
	"github.com/go-xorm/xorm"
	"github.com/mattn/go-sqlite3"
)

var ErrNotExist = errors.New("not exist")
var orm *xorm.Engine

func Init(isDebug bool) {
	var err error
	orm, err = xorm.NewEngine("sqlite3", "ccih.db")
	if err != nil {
		panic(err)
	}

	if isDebug {
		orm.ShowSQL = true
		orm.ShowDebug = true
		orm.ShowWarn = true
	}

	orm.ShowErr = true
	orm.ShowInfo = true

	err = orm.Sync2(new(Antibiotic), new(Bacteria), new(Material),
		new(Sector), new(Profile), new(Trial))
	if err != nil {
		panic(err)
	}

}
