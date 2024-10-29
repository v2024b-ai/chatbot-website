from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from scoring import grade_summary
from pydantic import BaseModel

class InputData(BaseModel):
    genStr: str

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def get_data():
    return JSONResponse(content={"message": "Python working"})

@app.post('/api/test-scoring')
async def post_data(input_data: InputData):
    reference_summary = {"1,000 people mourned Matthew Shepherd, the gay University of Wyoming student who was severely beaten and left to die tied to a fence." + 
                        "The crime sparked nationwide vigils and prompted President Clinton to call for federal hate-crimes legislation." + 
                        "In 19 states, including Colorado, sexual orientation is not included in hate-crime laws." + 
                        "Wyoming is one of 10 states with no hate-crime laws at all, but the governor appealed to lawmakers to reconsider their opposition." + 
                        "Christian conservatives argue that hate-crime laws restrict freedom of speech, while gay rights activists and others say these laws send a message that attacks on minorities will not be tolerated."} 
    
    scores = grade_summary(reference_summary, input_data.genStr)
    return JSONResponse(content=scores)
    

host = os.getenv("HOST","localhost")

if __name__ == "__main__":
    uvicorn.run(app, host=host, port=8000)