package Models

type Videojuego struct {
	Id        uint   `json:"id"`
	Title     string `json:"title"`
	Plataform string `json:"plataform"`
	Price     int    `json:"price"`
	Rate      int    `json:"rate"`
}

func (b *Videojuego) TableName() string {
	return "videojuego"
}
