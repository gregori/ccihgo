package model

import (
	"fmt"
	"time"
)

type Bacteria struct {
	Id       int64
	Name     string    `xorm:"varchar(100) not null"`
	Gram     string    `xorm:"varchar(1) not null"`
	Created  time.Time `xorm:"created"`
	Modified time.Time `xorm:"updated"`
}

func (b *Bacteria) String() string {
	return util.ToStr(b.Id)
}

func GetBacteriaById(id int64) (*Bacteria, error) {
	var bac Bacteria
	has, err := orm.Id(id).Get(&bac)
	if err != nil {
		return nil, err
	}
	if !has {
		return nul, ErrNotExist
	}
	return &bac, nil
}

func GetBacteriaByName(name string) (*Bacteria, error) {
	var bac = Bacteria{Name: name}
	has, err = orm.Get(&bac)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, ErrNotExist
	}
	return &bac, nil
}

func FindBacteriasByGram(gram string, bacs *[]Bacteria) (int64, error) {
	err := orm.Find(bacs)
	return int64(len(*bacs)), err
}
