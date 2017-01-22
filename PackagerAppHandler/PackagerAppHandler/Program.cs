using System;
using System.Windows.Forms;

namespace PackagerAppHandler
{
    static class Program
    {
        
        [STAThread]
        static void Main(string[] argv)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Main(argv));
        }
    
    }
}
