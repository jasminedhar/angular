using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApplication4.Database;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class BlogModelsController : ApiController
    {
        private BlogsEntities1 db = new BlogsEntities1();

        // GET: api/BlogModels
        public IQueryable<BlogsData> GetBlogModels()
        {
            return db.BlogsDatas;
        }

        // GET: api/BlogModels/5
        [ResponseType(typeof(BlogModel))]
        public IHttpActionResult GetBlogModel(int id)
        {
            BlogsData blogModel = db.BlogsDatas.Find(id);
            if (blogModel == null)
            {
                return NotFound();
            }

            return Ok(blogModel);
        }

        // PUT: api/BlogModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBlogModel(int id, BlogsData blogModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != blogModel.Id)
            {
                return BadRequest();
            }
            
            db.Entry(blogModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BlogModels
        [ResponseType(typeof(BlogModel))]
        public IHttpActionResult PostBlogModel(BlogsData blogModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (blogModel.Id == 0) 
            {
                db.BlogsDatas.Add(blogModel);
            }
            else
            {
                db.Entry(blogModel).State = EntityState.Modified;
            }
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = blogModel.Id }, blogModel);
        }

        // DELETE: api/BlogModels/5
        [ResponseType(typeof(BlogModel))]
        public IHttpActionResult DeleteBlogModel(int id)
        {
            BlogsData blogModel = db.BlogsDatas.Find(id);
            if (blogModel == null)
            {
                return NotFound();
            }

            db.BlogsDatas.Remove(blogModel);
            db.SaveChanges();

            return Ok(blogModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BlogModelExists(int id)
        {
            return db.BlogModels.Count(e => e.Id == id) > 0;
        }
    }
}