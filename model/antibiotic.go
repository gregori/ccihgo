package model

import (
	"fmt"
	"time"
)

type Antibiotic struct {
	Id       int64
	Name     string    `xorm:"varchar(100) not null"`
	Gram     string    `xorm:"varchar(1) not null"`
	Created  time.Time `xorm:"created"`
	Modified time.Time `xorm:"updated"`
}

func (a *Antibiotic) String() string {
	return util.ToStr(a.Id)
}

func GetAntibioticByName(name string) (*Antibiotic, error) {
	var atb = Antibiotic{Name: name}
	has, err = orm.Get(&atb)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, ErrNotExist
	}
	return &atb, nil
}

func FindAntibioticsByGram(gram string, atbs *[]Antibiotic) (int64, error) {
	err := orm.Where("gram = ?", gram).Find(atbs)
	return int64(len(*atbs)), err
}
