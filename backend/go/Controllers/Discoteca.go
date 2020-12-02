package Controllers

import (
	"5_go_mysql/Models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GetDiscotecas ... Get all discotecas
func GetDiscotecas(c *gin.Context) {
	var discoteca []Models.Discoteca
	err := Models.GetAllDiscotecas(&discoteca)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, discoteca)
	}
}

//CreateDiscoteca ... Create Discoteca
func CreateDiscoteca(c *gin.Context) {
	var discoteca Models.Discoteca
	c.BindJSON(&discoteca)
	err := Models.CreateDiscoteca(&discoteca)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, discoteca)
	}
}

//GetDiscotecaByID ... Get the discoteca by id
func GetDiscotecaByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var discoteca Models.Discoteca
	err := Models.GetDiscotecaByID(&discoteca, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, discoteca)
	}
}

//UpdateDiscoteca ... Update the discoteca information
func UpdateDiscoteca(c *gin.Context) {
	var discoteca Models.Discoteca
	id := c.Params.ByName("id")
	err := Models.GetDiscotecaByID(&discoteca, id)
	if err != nil {
		c.JSON(http.StatusNotFound, discoteca)
	}
	c.BindJSON(&discoteca)
	err = Models.UpdateDiscoteca(&discoteca, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, discoteca)
	}
}

//DeleteDiscoteca ... Delete the discoteca
func DeleteDiscoteca(c *gin.Context) {
	var discoteca Models.Discoteca
	id := c.Params.ByName("id")
	err := Models.DeleteDiscoteca(&discoteca, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
