package Controllers

import (
	"5_go_mysql/Models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GetVideojuegos ... Get all videojuegos
func GetVideojuegos(c *gin.Context) {
	var videojuego []Models.Videojuego
	err := Models.GetAllVideojuegos(&videojuego)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, videojuego)
	}
}

//CreateVideojuego ... Create Videojuego
func CreateVideojuego(c *gin.Context) {
	var videojuego Models.Videojuego
	c.BindJSON(&videojuego)
	err := Models.CreateVideojuego(&videojuego)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, videojuego)
	}
}

//GetVideojuegoByID ... Get the videojuego by id
func GetVideojuegoByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var videojuego Models.Videojuego
	err := Models.GetVideojuegoByID(&videojuego, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, videojuego)
	}
}

//UpdateVideojuego ... Update the videojuego information
func UpdateVideojuego(c *gin.Context) {
	var videojuego Models.Videojuego
	id := c.Params.ByName("id")
	err := Models.GetVideojuegoByID(&videojuego, id)
	if err != nil {
		c.JSON(http.StatusNotFound, videojuego)
	}
	c.BindJSON(&videojuego)
	err = Models.UpdateVideojuego(&videojuego, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, videojuego)
	}
}

//DeleteVideojuego ... Delete the videojuego
func DeleteVideojuego(c *gin.Context) {
	var videojuego Models.Videojuego
	id := c.Params.ByName("id")
	err := Models.DeleteVideojuego(&videojuego, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
