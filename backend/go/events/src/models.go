package events
import (
	"fmt"
	"goApp/common"
	"github.com/jinzhu/gorm"
	
)

// "github.com/jinzhu/gorm"
// "goApp/common"
//"fmt"   "errors"  "github.com/gin-gonic/gin"   "net/http"


type Events struct {
	Id            uint
	Name          string   `json:"name"`
	// Discoteca_id  uint     `json:"discoteca_id"`
}

type Discotecas struct {
	Id          uint
	Name        string   `json:"name"`
	Views		int      `json:"views"`
}

type DiscoEventModel struct {
	gorm.Model
	Discoteca     Discotecas
	DiscotecaID   uint
	Event         Events
	EventID       uint
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
	db.AutoMigrate(&DiscoEventModel{})
}

func CreateEventDisco(event Events, discotecaId uint) error {
	// fmt.Println("FAvorite de: ",user," A la discoteca: ", discoteca)
	fmt.Println("Relacionamos el evento: ",event," a la discoteca: ",discotecaId)
	db := common.GetDB()
	var discoEvent DiscoEventModel
	err := db.FirstOrCreate(&discoEvent, &DiscoEventModel{
		DiscotecaID:   discotecaId,
		EventID:  	   event.Id,
	}).Error
	return err
}

//De momento no hace falta esta funcion porque pillo el usuario de myUser
// func FindOneUser(condition interface{}) (User, error) {
// 	db := common.GetDB()
// 	var model User
// 	err := db.Where(condition).First(&model).Error
// 	return model, err
// }