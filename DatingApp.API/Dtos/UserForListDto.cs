using System;
using System.Collections.Generic;

namespace DatingApp.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }

        public string username { get; set; }

        public string Gender { get; set; }

        public int age { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string PhotoUrl { get; set; }
    }
}