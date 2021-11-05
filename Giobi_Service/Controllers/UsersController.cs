using Giobi_Service.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SSBRSWEB_Service.Controllers;
using SSBRSWEB_Service.Identity;
using SSBRSWEB_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Giobi_Service.Controllers
{
    public class UsersController : BaseApiController
    {
        private const string LocalLoginProvider = "Local";
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _dbContext;


        public UsersController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<ActionResult<RegisterModel>> CreateUser([FromBody] UserCrudDto model)
        {

            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return Unauthorized("User already exists");

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if(result.Errors.Count()!=0)
            {
                return BadRequest(result.Errors.ElementAt(0).Description);
            }

            return new RegisterModel
            {
                Username=model.Username,
                Email=model.Email
            };
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromBody] UserCrudDto model)
        {

            var user = _dbContext.Users.FirstOrDefault(m => m.Id == model.ID);
            user.UserName = model.Username;
            user.Email = model.Email;
            await _dbContext.SaveChangesAsync();
            return Ok();

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {

            var user = _dbContext.Users.FirstOrDefault(m => m.Id == id);
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return Ok();

        }
        [HttpGet("{searchString}")]
        public async Task<ActionResult<List<RegisterModel>>> GetUsers(string searchString)
     {
            var users = new List<RegisterModel>();
            if(searchString=="all_data")
            {
                users =
                     await _dbContext.Users
                     .Select(item => new RegisterModel
                     {
                         Username = item.UserName,
                         Email = item.Email,
                         ID = item.Id
                     })
                     .ToListAsync();
            }
            else
            {
                users =
                     await _dbContext.Users
                     .Select(item => new RegisterModel
                     {
                         Username = item.UserName,
                         Email = item.Email,
                         ID = item.Id
                     })
                     .Where(i=>i.Username.Contains(searchString))
                     .ToListAsync();
            }
            return Ok(users);
        }
    }
}
