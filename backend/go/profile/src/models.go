package profile

type Profile struct {
	Id	    	uint
	Name        string   `json:"name"`
	Surname		string   `json:"surname"`
	Description string   `json:"description"`
	User_id	    uint
}