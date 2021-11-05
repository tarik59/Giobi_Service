using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Giobi_Service.Models.DTOs
{
    public class UserCrudDto
    {

        public string Email { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }
        public string ID { get; set; }
    }
}
