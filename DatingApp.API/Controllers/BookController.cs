using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DatingApp.API;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using DatingApp.API.Data;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly DataContext _context;

        public BookController (DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.books.ToListAsync());
        }

        [HttpGet("{genre}")]
        public async Task<IActionResult> Get(string genre)
        {
            List<BookModel> books = new List<BookModel>();
            await _context.books.ForEachAsync(b => 
            {
                if(b.Genre == genre) books.Add(b);
            });

            return Ok(books);
        }

        [HttpGet("GetByID/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _context.books.SingleOrDefaultAsync(b => b.Id == id));
        }
    }
}