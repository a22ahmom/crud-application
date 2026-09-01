using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
    public async Task<IActionResult> GetQuotes()
    {
        var quotes = await _context.Quotes
            .Include(q => q.User)
            .Select(q => new
            {
                q.Id,
                q.Text,
                q.Author,
                q.UserId,
                Username = q.User != null ? q.User.Username : ""
            })
            .ToListAsync();

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

    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        quote.UserId = userId;
        quote.User = null;

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetQuote),
            new { id = quote.Id},
            quote
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(
        int id,
        Quote updatedQuote
    )
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        if (quote.UserId != userId)
        {
            return Forbid();
        }

        quote.Text = updatedQuote.Text;
        quote.Author = updatedQuote.Author;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        if (quote.UserId != userId)
        {
            return Forbid();
        }

        _context.Quotes.Remove(quote);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}