import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost, BlogPostDocument } from '../schemas/blog-post.schema';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';

export interface BlogPostWithId extends Omit<BlogPost, '_id'> {
  _id: string;
}

@Injectable()
export class BlogPostRepository {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  // Create a new blog post
  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const newBlogPost = new this.blogPostModel(createBlogPostDto);
    return newBlogPost.save();
  }

// Find all blog posts
async findAll(): Promise<any[]> {
  const blogPosts = await this.blogPostModel
    .find()
    .populate({
      path: 'authorId',
      model: 'Member', 
      populate: {      
        path: 'user_id',
        model: 'User', 
      }
    })
    .lean()
    .exec();

  return blogPosts.map((post) => ({
    ...post,
    _id: post._id.toString(),
  }));
}


  // Find a blog post by ID
  async findOne(id: string): Promise<BlogPost> {
    return this.blogPostModel.findById(id).exec();
  }

  // Update a blog post by ID
  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
  }

  // Delete a blog post by ID
  async delete(id: string): Promise<BlogPost> {
    return this.blogPostModel.findByIdAndDelete(id).exec();
  }
}
