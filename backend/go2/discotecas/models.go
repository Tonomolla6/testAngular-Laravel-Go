package discotecas

// import (
// 	_ "fmt"
// 	"github.com/jinzhu/gorm"
// 	"github.com/xema/testAngular-Laravel-Go/backend/go2/common"

// )

type Discotecas struct {
	Id          uint
	Name        string `json:"name"`
	Company     string `json:"company"`
	Events      string `json:"events"`
}

// //Post
// func SaveOne(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Save(data).Error
// 	return err
// }

// //Details
// func FindOneDiscoteca(condition interface{}) (DiscotecaModel, error) {
// 	db := common.GetDB()
// 	var model DiscotecaModel
// 	tx := db.Begin()
// 	tx.Where(condition).First(&model)
// 	// tx.Model(&model).Related(&model.Author, "Author")
// 	// tx.Model(&model.Author).Related(&model.Author.UserModel)
// 	// tx.Model(&model).Related(&model.Tags, "Tags")
// 	err := tx.Commit().Error
// 	return model, err
// }

// //Update
// func (model *DiscotecaModel) Update(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Model(model).Update(data).Error
// 	return err
// }

// //Delete
// func DeleteDiscotecaModel(condition interface{}) error {
// 	db := common.GetDB()
// 	err := db.Where(condition).Delete(DiscotecaModel{}).Error
// 	return err
// }

