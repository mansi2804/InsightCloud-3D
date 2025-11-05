from pydantic import BaseModel, HttpUrl
from typing import List

class ArticleRequest(BaseModel):
    url: HttpUrl
    
class KeywordResponse(BaseModel):
    word: str
    weight: float
    
class ErrorResponse(BaseModel):
    error: str
    detail: str