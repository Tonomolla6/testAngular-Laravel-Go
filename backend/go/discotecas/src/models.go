package discotecas
import (
	"fmt"
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	
)

type Discotecas struct {
	Id          uint
	Name        string   `json:"name"`
	Company     string   `json:"company"`
}
type DiscotecaUserModel struct {
	UserModel      UserModel
	UserModelID    uint
	FavoriteModels []FavoriteModel `gorm:"ForeignKey:FavoriteByID"`
}

type FavoriteModel struct{
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

	db.AutoMigrate(&DiscotecaUserModel{})
	db.AutoMigrate(&FavoriteModel{})
}

func GetDiscotecaUserModel(userModel UserModel) DiscotecaUserModel {
	var discotecaUserModel DiscotecaUserModel
	if userModel.ID == 0 {
		return discotecaUserModel
	}
	db := common.GetDB()
	db.Where(&DiscotecaUserModel{
		UserModelID: userModel.ID,
	}).FirstOrCreate(&discotecaUserModel)
	discotecaUserModel.UserModel = userModel
	return discotecaUserModel
}


func (discoteca Discotecas) favoriteBy(user DiscotecaUserModel) error {
	db := common.GetDB()
	var favorite FavoriteModel
	err := db.FirstOrCreate(&favorite, &FavoriteModel{
		FavoriteID:   discoteca.Id,
		FavoriteByID: user.UserModelID,  //user.ID,
	}).Error
	return err
}




func DiscotecaFavorite(c *gin.Context) {
	fmt.Println("FAVORITEEEEEEEEEEEEEEEE")
	id := c.Params.ByName("id")
	fmt.Println("Debugger1")
	var discoteca Discotecas
	err := GetDiscotecaById(&discoteca, id)
	fmt.Println("Debugger2")
	if err != nil {
		fmt.Println("Debuggererr != nil")
		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid ID")))
		return
	}
	fmt.Println("Debugger3")
	myUserModel := c.MustGet("my_user_model").(UserModel)  //Aqui peta
	fmt.Println("Debugger4")
	err = discoteca.favoriteBy(GetDiscotecaUserModel(myUserModel))
	fmt.Println("Debugger5")
	// serializer := ArticleSerializer{c, articleModel}
	// c.JSON(http.StatusOK, gin.H{"discoteca": serializer.Response()})
	c.JSON(http.StatusOK, gin.H{"discoteca": "test"})

}