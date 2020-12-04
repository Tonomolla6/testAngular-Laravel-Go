package Models

type Entrada struct {
	Id          uint   `json:"id"`
	Evento      string `json:"evento"`
	Consumicion int    `json:"consumicion"`
}

func (b *Entrada) TableName() string {
	return "entrada"
}
