using System;
using System.Diagnostics;
using System.Windows.Forms;

namespace PackagerAppHandler
{
    static class Program
    {
        private static string command;
        private static string protocol;
        private static string value;
        private static string arg1;
        private static string arg2;

        [STAThread]
        static void Main(string[] argv)
        {
            if (argv.Length > 0)
            {
                string[] uri = argv[0].Split('/');
                protocol     = uri[0];
                command      = uri[2];

                if (uri.Length >= 4) value = uri[3];
                if (uri.Length >= 5) arg1  = uri[4];
                if (uri.Length >= 6) arg2  = uri[5];
                
                if (uri.Length >= 4) command += (" " + value);
                if (uri.Length >= 5) command += (" " + arg1);
                if (uri.Length >= 6) command += (" " + arg2);

                Process proc = new System.Diagnostics.Process();
                proc.StartInfo.FileName = @"D:\.dev\CurrentProjects\packager\packager.cmd";
                proc.StartInfo.Arguments = command;
                proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                proc.StartInfo.CreateNoWindow = true;
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.RedirectStandardOutput = true;
                proc.Start();
                string output = proc.StandardOutput.ReadToEnd();
                proc.WaitForExit();
                //Çıktıyı İşle
            }
            else
            {
                MessageBox.Show("Parametre hatalı", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            
            Application.Exit();
        }
    }
}
