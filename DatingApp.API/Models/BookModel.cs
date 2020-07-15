using System;

namespace DatingApp.API
{
    public class BookModel
    {
        private string genre;
        private string author;
        private string name;

        private int id;

        public string Author { get => author; set => author = value; }
        public string Name { get => name; set => name = value; }
        public string Genre { get => genre; set => genre = value; }
        public int Id { get => id; set => id = value; }
    }    
}