package profile

type Profile struct {
	User_id	    uint
	Name        string   `json:"name"`
	Surname		string   `json:"surname"`
	Description string   `json:"description"`
}