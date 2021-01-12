package discotecas
import (
	"github.com/jinzhu/gorm"
	"goApp/common"
)
// "fmt"
	// "github.com/jinzhu/gorm"
	// 
	// "goApp/common"
//"fmt"   "errors"  "github.com/gin-gonic/gin"   "net/http"
//"goApp/jinzhu/gorm"

type Discotecas struct {
	Id          uint
	Name        string   `json:"name"`
	Company     string   `json:"company"`
}

// type DiscotecaUserModel struct {
// 	gorm.Model
// 	UserModel        UserModel
// 	UserModelID      uint
// 	DiscotecaModels  []Discotecas  `gorm:"ForeignKey:AuthorID"`
// 	FavoriteModels   []FavoriteModel `gorm:"ForeignKey:FavoriteByID"`
// }


type FavoriteModel struct {
	gorm.Model
	Favorite     Discotecas
	FavoriteID   uint
	FavoriteBy   UserModel
	FavoriteByID uint
}

type UserModel struct {
	ID           uint    `gorm:"primary_key"`
	Username     string  `gorm:"column:username"`
	Email        string  `gorm:"column:email; unique_index"`
	Bio          string  `gorm:"column:bio; size:1024"`
	Image        *string `gorm:"column:image"`
	PasswordHash string  `gorm:"column:password; not null"`
	Type		 string	 `gorm:"column:type;" default:'client'`
}



func FindOneUser(condition interface{}) (UserModel, error) {
	db := common.GetDB()
	var model UserModel
	err := db.Where(condition).First(&model).Error
	return model, err
}








// func AutoMigrate() {
// 	db := common.GetDB()

// 	db.AutoMigrate(&DiscotecaUserModel{})
// 	db.AutoMigrate(&FavoriteModel{})
// }


/////////////////////
// func GetDiscotecaUserModel(userModel UserModel) DiscotecaUserModel {
// 	fmt.Println("DENTRO DEL GETDISCOUSERMODEL")
// 	var discotecaUserModel DiscotecaUserModel
// 	if userModel.ID == 0 {
// 		return discotecaUserModel
// 	}
// 	db := common.GetDB()
// 	db.Where(&DiscotecaUserModel{
// 		UserModelID: userModel.ID,
// 	}).FirstOrCreate(&discotecaUserModel)
// 	discotecaUserModel.UserModel = userModel
// 	return discotecaUserModel
// }
// ////////////////////
// func (discoteca Discotecas) favoritesCount() uint {
// 	db := common.GetDB()
// 	var count uint
// 	db.Model(&FavoriteModel{}).Where(FavoriteModel{
// 		FavoriteID: discoteca.Id,
// 	}).Count(&count)
// 	return count
// }

// //////////////////////7

// func (discoteca Discotecas) isFavoriteBy(user DiscotecaUserModel) bool {
// 	db := common.GetDB()
// 	var favorite FavoriteModel
// 	db.Where(FavoriteModel{
// 		FavoriteID:   discoteca.Id,
// 		FavoriteByID: user.ID,
// 	}).First(&favorite)
// 	return favorite.ID != 0
// }

// //////////////////////

// func (discoteca Discotecas) favoriteBy(user DiscotecaUserModel) error {
// 	fmt.Println("DENTRO DEL FAVORITE BY")
// 	db := common.GetDB()
// 	var favorite FavoriteModel
// 	err := db.FirstOrCreate(&favorite, &FavoriteModel{
// 		FavoriteID:   discoteca.Id,
// 		FavoriteByID: user.ID,
// 	}).Error
// 	return err
// }