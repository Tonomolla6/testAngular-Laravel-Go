package entradas

// import (
// 	"github.com/gin-gonic/gin"
// 	"goApp/common"
// )


// // Declare your response schema here
// type Entradas struct {
// 	Id          uint
// 	Name        string   `json:"name"`
// 	Company     string   `json:"company"`
// 	Views		int	     `json:"views"`
// }

// type EntradassSerializer struct {
// 	C        *gin.Context
// 	Entradas []Entradas
// }

// type EntradasSerializer struct {
// 	C *gin.Context
// 	Entradas
// }


// func (s *EntradasSerializer) Response() Entradas {
// 	myUserModel := s.C.MustGet("my_user_model").(UserModel)
// 	response := Entradas {
// 		Id:          s.Id,
// 		Name:        s.Name
// 		Company:     s.Company
// 		// Favorite:    s.isFavoriteBy(GetEntradasUserModel(myUserModel)),
// 		Views:	     s.Views,
// 	}
	
// 	return response
// }


// func (s *EntradassSerializer) Response() []Entradas {
// 	response := []Entradas{}
// 	for _, entradas := range s.Entradass {
// 		serializer := EntradasSerializer{s.C, entradas}
// 		response = append(response, serializer.Response())
// 	}
// 	return response
// }
