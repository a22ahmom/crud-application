using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        var quotes = await _context.Quotes.ToListAsync();

        return Ok(quotes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        return Ok(quote);
    }
}