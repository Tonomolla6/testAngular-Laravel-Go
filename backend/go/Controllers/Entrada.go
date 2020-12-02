package Controllers

import (
	"5_go_mysql/Models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GetEntradas ... Get all entradas
func GetEntradas(c *gin.Context) {
	var entrada []Models.Entrada
	err := Models.GetAllEntradas(&entrada)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, entrada)
	}
}

//CreateEntrada ... Create Entrada
func CreateEntrada(c *gin.Context) {
	var entrada Models.Entrada
	c.BindJSON(&entrada)
	err := Models.CreateEntrada(&entrada)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, entrada)
	}
}

//GetEntradaByID ... Get the entrada by id
func GetEntradaByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var entrada Models.Entrada
	err := Models.GetEntradaByID(&entrada, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, entrada)
	}
}

//UpdateEntrada ... Update the entrada information
func UpdateEntrada(c *gin.Context) {
	var entrada Models.Entrada
	id := c.Params.ByName("id")
	err := Models.GetEntradaByID(&entrada, id)
	if err != nil {
		c.JSON(http.StatusNotFound, entrada)
	}
	c.BindJSON(&entrada)
	err = Models.UpdateEntrada(&entrada, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, entrada)
	}
}

//DeleteEntrada ... Delete the entrada
func DeleteEntrada(c *gin.Context) {
	var entrada Models.Entrada
	id := c.Params.ByName("id")
	err := Models.DeleteEntrada(&entrada, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
