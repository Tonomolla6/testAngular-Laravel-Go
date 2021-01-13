package discotecas
import (
	"github.com/jinzhu/gorm"
	"goApp/common"
	"fmt"
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

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&FavoriteModel{})
}



//De momento no hace falta esta funcion porque pillo el usuario de myUserModel
func FindOneUser(condition interface{}) (UserModel, error) {
	db := common.GetDB()
	var model UserModel
	err := db.Where(condition).First(&model).Error
	return model, err
}


//LIKE
func favoriteBy(user UserModel, discoteca Discotecas) error {
	fmt.Println("FAvorite de: ",user," A la discoteca: ", discoteca)
	db := common.GetDB()
	var favorite FavoriteModel
	err := db.FirstOrCreate(&favorite, &FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).Error
	return err
}

//FAVORITE BY
func (discoteca Discotecas) isFavoriteBy(user UserModel) bool {
	db := common.GetDB()
	var favorite FavoriteModel
	db.Where(FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).First(&favorite)
	return favorite.ID != 0
}


//UNLIKE
func unFavoriteBy(user UserModel, discoteca Discotecas) error {
	fmt.Println("DENTRO del UNNLIKE")
	db := common.GetDB()
	err := db.Where(FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).Delete(FavoriteModel{}).Error
	// fmt.Println(err)
	return err
}


