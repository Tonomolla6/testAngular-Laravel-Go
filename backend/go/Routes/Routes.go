package Routes

import (
	"5_go_mysql/Controllers"

	"github.com/gin-gonic/gin"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	r := gin.Default()
	grp1 := r.Group("/api")
	{
		grp1.GET("user", Controllers.GetUsers)
		grp1.POST("user", Controllers.CreateUser)
		grp1.GET("user/:id", Controllers.GetUserByID)
		grp1.PUT("user/:id", Controllers.UpdateUser)
		grp1.DELETE("user/:id", Controllers.DeleteUser)
		///videojuegos
		grp1.GET("videojuego", Controllers.GetVideojuegos)
		grp1.POST("videojuego", Controllers.CreateVideojuego)
		grp1.GET("videojuego/:id", Controllers.GetVideojuegoByID)
		grp1.PUT("videojuego/:id", Controllers.UpdateVideojuego)
		grp1.DELETE("videojuego/:id", Controllers.DeleteVideojuego)
		//events
		grp1.GET("event", Controllers.GetEvents)
		grp1.POST("event", Controllers.CreateEvent)
		grp1.GET("event/:id", Controllers.GetEventByID)
		grp1.PUT("event/:id", Controllers.UpdateEvent)
		grp1.DELETE("event/:id", Controllers.DeleteEvent)
		//discotecas
		grp1.GET("discoteca", Controllers.GetDiscotecas)
		grp1.POST("discoteca", Controllers.CreateDiscoteca)
		grp1.GET("discoteca/:id", Controllers.GetDiscotecaByID)
		grp1.PUT("discoteca/:id", Controllers.UpdateDiscoteca)
		grp1.DELETE("discoteca/:id", Controllers.DeleteDiscoteca)
		//entradas
		grp1.GET("entrada", Controllers.GetEntradas)
		grp1.POST("entrada", Controllers.CreateEntrada)
		grp1.GET("entrada/:id", Controllers.GetEntradaByID)
		grp1.PUT("entrada/:id", Controllers.UpdateEntrada)
		grp1.DELETE("entrada/:id", Controllers.DeleteEntrada)
	}

	// grp2 := r.Group("/api")
	// {
	// 	grp2.GET("videojuego", Controllers.GetVideojuegos)
	// 	grp2.POST("videojuego", Controllers.CreateVideojuego)
	// 	grp2.GET("videojuego/:id", Controllers.GetVideojuegoByID)
	// 	grp2.PUT("videojuego/:id", Controllers.UpdateVideojuego)
	// 	grp2.DELETE("videojuego/:id", Controllers.DeleteVideojuego)
	// }

	return r
}
