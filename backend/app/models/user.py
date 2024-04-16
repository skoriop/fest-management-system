from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    phonenumber: int
    email: str
    from_bits: bool
    bits_id: str
    affiliation: str
    spent: int = 0