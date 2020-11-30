package discotecas

import (
	"errors"
	"github.com/xema/testAngular-Laravel-Go/backend/go2/common"
	"github.com/gin-gonic/gin"
	"net/http"
	
)
// "strconv" para los coments


func DiscotecasRegister(router *gin.RouterGroup) {
	router.POST("/", DiscotecaCreate)
	// router.PUT("/:slug", DiscotecaUpdate)
	router.DELETE("/:id", DiscotecaDelete)
	// router.POST("/:slug/favorite", DiscotecaFavorite)
	// router.DELETE("/:slug/favorite", DiscotecaUnfavorite)
	// router.POST("/:slug/comments", DiscotecaCommentCreate)
	// router.DELETE("/:slug/comments/:id", DiscotecaCommentDelete)
}

func DiscotecasAnonymousRegister(router *gin.RouterGroup) {
	router.GET("/", DiscotecaList)
	// router.GET("/:slug", DiscotecaRetrieve)  //DiscotecaById
	// router.GET("/:slug/comments", DiscotecaCommentList)
}

func DiscotecaCreate(c *gin.Context){
	var discoteca Discotecas
	c.BindJSON(&discoteca);

	
	err:=CreateDiscoteca(&discoteca)

	if err !=nil{
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		c.JSON(http.StatusOK, gin.H{"discoteca":discoteca})
		return
	}
}


//List Discotecas
func DiscotecaList(c *gin.Context) {
	var discoteca []Discotecas

	//Busca las discotecas y mete el resultado en la var discoteca
	err := GetAllDiscotecas(&discoteca)
	
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		c.JSON(http.StatusOK, discoteca)
	}

	
}

//DELETE discoteca
func DiscotecaDelete(c *gin.Context){
	var discoteca Discotecas
	id := c.Params.ByName("id")

	err := DeleteDiscoteca(&discoteca, id)

	if err != nil{
		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid id")))
		return
	} 

	c.JSON(http.StatusOK, gin.H{"discoteca": "Delete Discoteca"})

}



// ///////// Find ONE
// func DiscotecaRetrieve(c *gin.Context) {
// 	slug := c.Param("slug")
// 	// if slug == "feed" {
// 	// 	DiscotecaFeed(c)
// 	// 	return
// 	// }
// 	discotecaModel, err := FindOneDiscoteca(&DiscotecaModel{Slug: slug})
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid slug")))
// 		return
// 	}
// 	serializer := DiscotecaSerializer{c, discotecaModel}
// 	c.JSON(http.StatusOK, gin.H{"discoteca": serializer.Response()})
// }
// ////////

// func DiscotecaUpdate(c *gin.Context) {
// 	slug := c.Param("slug")
// 	discotecaModel, err := FindOneDiscoteca(&DiscotecaModel{Slug: slug})
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid slug")))
// 		return
// 	}
// 	discotecaModelValidator := NewDiscotecaModelValidatorFillWith(discotecaModel)
// 	if err := discotecaModelValidator.Bind(c); err != nil {
// 		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
// 		return
// 	}

// 	discotecaModelValidator.discotecaModel.ID = discotecaModel.ID
// 	if err := discotecaModel.Update(discotecaModelValidator.discotecaModel); err != nil {
// 		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
// 		return
// 	}
// 	serializer := DiscotecaSerializer{c, discotecaModel}
// 	c.JSON(http.StatusOK, gin.H{"discoteca": serializer.Response()})
// }

// func DiscotecaDelete(c *gin.Context) {
// 	slug := c.Param("slug")
// 	err := DeleteDiscotecaModel(&DiscotecaModel{Slug: slug})
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid slug")))
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"discoteca": "Delete success"})
// }
