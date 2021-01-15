package discotecas
import (
	"github.com/jinzhu/gorm"
	"goApp/common"
	"fmt"
)
// "fmt"
// "github.com/jinzhu/gorm"
// "goApp/common"
//"fmt"   "errors"  "github.com/gin-gonic/gin"   "net/http"


type Discotecas struct {
	Id          uint
	Name        string   `json:"name"`
	Company     string   `json:"company"`
	Views		int      `json:"views"`
}


type FavoriteModel struct {
	gorm.Model
	Favorite     Discotecas
	FavoriteID   uint
	FavoriteBy   User
	FavoriteByID uint
}

type User struct {
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
func FindOneUser(condition interface{}) (User, error) {
	db := common.GetDB()
	var model User
	err := db.Where(condition).First(&model).Error
	return model, err
}


//LIKE
func favoriteBy(user User, discoteca Discotecas) error {
	fmt.Println("FAvorite de: ",user," A la discoteca: ", discoteca)
	db := common.GetDB()
	var favorite FavoriteModel
	err := db.FirstOrCreate(&favorite, &FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).Error
	return err
}

//UNLIKE
func unFavoriteBy(user User, discoteca Discotecas) error {
	fmt.Println("DENTRO del UNNLIKE")
	db := common.GetDB()
	err := db.Where(FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).Delete(FavoriteModel{}).Error
	// fmt.Println(err)
	return err
}

//Is favorited
func isFavoriteBy(discoteca Discotecas,user User) bool {
	db := common.GetDB()
	var favorite FavoriteModel
	db.Where(FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.ID,
	}).First(&favorite)
	return favorite.ID != 0
}


//Add visit
func VisitDisco(discoteca Discotecas) error{
	db := common.GetDB()
	discoteca.Views ++;
	err := db.Save(discoteca).Error

	return err
}
