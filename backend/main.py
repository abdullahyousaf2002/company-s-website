from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Datxoc Portfolio API", version="1.0.0")

# CORS for allowing React frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ConsultationRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    companyName: str
    industry: str
    businessSize: str
    currentChallenges: str
    dataAvailability: str
    techStack: str
    budget: str
    timeline: str
    contact: str
    analysis: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ConsultationCreate(BaseModel):
    companyName: str
    industry: str
    businessSize: str
    currentChallenges: str
    dataAvailability: str
    techStack: str
    budget: str
    timeline: str
    contact: str
    analysis: Optional[Dict[str, Any]] = None

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: Optional[str] = None
    author: str
    date: str
    readTime: str
    category: str
    published: bool = True
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: Optional[str] = None
    author: str
    date: str
    readTime: str
    category: str
    published: bool = True

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Basic routes
@api_router.get("/")
async def root():
    return {"message": "Datxoc Portfolio API is running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Status Check routes (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Consultation routes
@api_router.post("/consultations", response_model=ConsultationRequest)
async def create_consultation(consultation: ConsultationCreate):
    consultation_dict = consultation.dict()
    consultation_obj = ConsultationRequest(**consultation_dict)
    
    try:
        await db.consultations.insert_one(consultation_obj.dict())
        return consultation_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating consultation: {str(e)}")

@api_router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultations():
    try:
        consultations = await db.consultations.find().sort("timestamp", -1).to_list(1000)
        return [ConsultationRequest(**consultation) for consultation in consultations]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching consultations: {str(e)}")

@api_router.get("/consultations/{consultation_id}", response_model=ConsultationRequest)
async def get_consultation(consultation_id: str):
    try:
        consultation = await db.consultations.find_one({"id": consultation_id})
        if not consultation:
            raise HTTPException(status_code=404, detail="Consultation not found")
        return ConsultationRequest(**consultation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching consultation: {str(e)}")

# Blog routes
@api_router.post("/blog-posts", response_model=BlogPost)
async def create_blog_post(blog_post: BlogPostCreate):
    blog_post_dict = blog_post.dict()
    blog_post_obj = BlogPost(**blog_post_dict)
    
    try:
        await db.blog_posts.insert_one(blog_post_obj.dict())
        return blog_post_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating blog post: {str(e)}")

@api_router.get("/blog-posts", response_model=List[BlogPost])
async def get_blog_posts():
    try:
        blog_posts = await db.blog_posts.find({"published": True}).sort("timestamp", -1).to_list(1000)
        return [BlogPost(**blog_post) for blog_post in blog_posts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blog posts: {str(e)}")

@api_router.get("/blog-posts/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    try:
        blog_post = await db.blog_posts.find_one({"id": post_id, "published": True})
        if not blog_post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return BlogPost(**blog_post)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blog post: {str(e)}")

# Contact routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(contact: ContactMessageCreate):
    contact_dict = contact.dict()
    contact_obj = ContactMessage(**contact_dict)
    
    try:
        await db.contact_messages.insert_one(contact_obj.dict())
        return contact_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating contact message: {str(e)}")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(1000)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact messages: {str(e)}")

# Analytics routes
@api_router.get("/analytics/consultations")
async def get_consultation_analytics():
    try:
        total_consultations = await db.consultations.count_documents({})
        
        # Group by industry
        industry_pipeline = [
            {"$group": {"_id": "$industry", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        industry_stats = await db.consultations.aggregate(industry_pipeline).to_list(100)
        
        # Group by business size
        size_pipeline = [
            {"$group": {"_id": "$businessSize", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        size_stats = await db.consultations.aggregate(size_pipeline).to_list(100)
        
        # Recent consultations trend (last 30 days)
        from datetime import datetime, timedelta
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        
        trend_pipeline = [
            {"$match": {"timestamp": {"$gte": thirty_days_ago}}},
            {"$group": {
                "_id": {
                    "year": {"$year": "$timestamp"},
                    "month": {"$month": "$timestamp"},
                    "day": {"$dayOfMonth": "$timestamp"}
                },
                "count": {"$sum": 1}
            }},
            {"$sort": {"_id": 1}}
        ]
        trend_stats = await db.consultations.aggregate(trend_pipeline).to_list(100)
        
        return {
            "total_consultations": total_consultations,
            "industry_breakdown": industry_stats,
            "business_size_breakdown": size_stats,
            "recent_trend": trend_stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")

# Initialize sample blog posts
@api_router.post("/initialize-blog")
async def initialize_blog_posts():
    try:
        # Check if blog posts already exist
        existing_posts = await db.blog_posts.count_documents({})
        if existing_posts > 0:
            return {"message": "Blog posts already initialized"}
        
        sample_posts = [
            {
                "title": "The Future of AI in Business Automation",
                "excerpt": "Exploring how artificial intelligence is revolutionizing business processes and driving efficiency across industries.",
                "content": "Artificial Intelligence (AI) is no longer a futuristic concept—it's a present reality that's transforming how businesses operate. From automating routine tasks to providing intelligent insights, AI is becoming an essential tool for companies looking to stay competitive in today's fast-paced market.",
                "author": "Datxoc Team",
                "date": "2024-01-15",
                "readTime": "8 min read",
                "category": "AI Strategy"
            },
            {
                "title": "Machine Learning Implementation Best Practices",
                "excerpt": "A comprehensive guide to successfully implementing machine learning solutions in your organization.",
                "content": "Implementing machine learning (ML) in your organization requires careful planning, the right tools, and a clear understanding of your business objectives. This guide will walk you through the essential steps to ensure your ML project succeeds.",
                "author": "Datxoc Team",
                "date": "2024-01-10",
                "readTime": "12 min read",
                "category": "Machine Learning"
            },
            {
                "title": "Data Quality: The Foundation of Successful AI Projects",
                "excerpt": "Why data quality is crucial for AI success and how to ensure your data is ready for machine learning.",
                "content": "The success of any AI or machine learning project heavily depends on the quality of the data used to train the models. Poor data quality can lead to inaccurate predictions, biased results, and ultimately, project failure.",
                "author": "Datxoc Team",
                "date": "2024-01-05",
                "readTime": "6 min read",
                "category": "Data Science"
            }
        ]
        
        blog_posts = [BlogPost(**post) for post in sample_posts]
        await db.blog_posts.insert_many([post.dict() for post in blog_posts])
        
        return {"message": "Blog posts initialized successfully", "count": len(blog_posts)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initializing blog posts: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Datxoc Portfolio API starting up...")
    
    # Initialize sample blog posts
    try:
        existing_posts = await db.blog_posts.count_documents({})
        if existing_posts == 0:
            logger.info("Initializing sample blog posts...")
            await initialize_blog_posts()
    except Exception as e:
        logger.error(f"Error initializing blog posts: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down database client...")
    client.close()