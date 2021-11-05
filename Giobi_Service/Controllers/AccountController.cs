using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SSBRSWEB_Service.Interfaces;
using SSBRSWEB_Service.Models;
using SSBRSWEB_Service.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace SSBRSWEB_Service.Controllers
{
    public class AccountController : BaseApiController
    {


        private const string LocalLoginProvider = "Local";
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private ITokenService _tokenService;


        public AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,ITokenService tokenService,SignInManager<ApplicationUser> signInManager)
        {
           _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }
        [HttpPost]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterModel model)
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
            if (result.Errors.Count() != 0)
            {
                return BadRequest(result.Errors.ElementAt(0).Description);
            }
            return new UserDto
            {
                Email = model.Username,
                Token = _tokenService.CreateToken(user)
            };
        }
        [HttpPost]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized("Invalid username");
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid password!");
            return new UserDto
            {
                Email = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
     

    }
}
