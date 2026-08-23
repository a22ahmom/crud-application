using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IPasswordHasher<User> passwordHasher;

    public AuthController(AppDbContext context, IPasswordHasher<User> _passwordHasher)
    {
        _context = context;
        passwordHasher = _passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDtos request)
    {
        var userExists = await _context.Users
            .AnyAsync(user => user.Username == request.Username);

        if (userExists)
        {
            return BadRequest("Användarnamnet finns redan.");
        }

        var user = new User
        {
            Username = request.Username
        };

        user.PasswordHash = passwordHasher.HashPassword(
            user,
            request.Password
        );

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Användaren har registrerats");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(user => user.Username == request.Username);

        if (user == null)
        {
            return Unauthorized("Fel användarnamn eller lösenord");
        }

        var result = passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password
        );

        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized("Fel användarnamn eller lösenord.");
        }

        return Ok("Inloggningen lyckades!");
    }
}