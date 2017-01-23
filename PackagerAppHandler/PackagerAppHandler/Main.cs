using System.Diagnostics;
using System.Windows.Forms;

namespace PackagerAppHandler
{
    public partial class Main : Form
    {
        private static string[] msgs = new string[]
        {
            "NOPACKAGEINSTALLED",
            "NOVERSIONFOUND",
            "PACKAGENOTFOUND",
            "PACKAGEFOUND",
            "ALREADYINSTALLED",
            "CONNECTIONESTABILISHED",
            "DOWNLOADING",
            "CONNECTIONERROR",
            "DOWNLOADED",
            "EXTRACTBEGIN",
            "EXTRACTSUCCESS",
            "REGISTERING",
            "INSTALLEDSUCCESSFULLY",
            "LOCALDELETED",
            "REGISTERYDELETED",
            "LOCALFILESMISSING",
            "RUNNING",
            "NOTINSTALLED",
            "NOVERSION",
            "CONNECTIONREFUSED",
            "CONNECTIONERROR"
        };
        private static string command;
        private static string protocol;
        private static string value;
        private static string arg1;
        private static string arg2;
        private static string[] argv;

        public Main(string[] arg)
        {
            argv = arg;
            InitializeComponent();
        }

        public static string[] procOutput(string[] output)
        {
            for (int i = 0; i < output.Length; i++)
            {
                string mes = null;
                switch (output[i])
                {
                    case "NOPACKAGEINSTALLED": mes = "No packge installed."; break;
                    case "NOVERSIONFOUND": mes = "There is no version for this packge. It cant be install"; break;
                    case "NOVERSION": mes = "There is no version for this packge. It cant be install"; break;
                    case "PACKAGENOTFOUND": mes = "Package not found. May package code incorret or local repository empty."; break;
                    case "PACKAGEFOUND": mes = "Package found."; break;
                    case "ALREADYINSTALLED": mes = "This is already installed."; break;
                    case "CONNECTIONESTABILISHED": mes = "Connection estabilished."; break;
                    case "DOWNLOADING": mes = "Downloading."; break;
                    case "CONNECTIONERROR": mes = "Connection error."; break;
                    case "DOWNLOADED": mes = "Download error."; break;
                    case "EXTRACTBEGIN": mes = "Extractation begin."; break;
                    case "EXTRACTSUCCESS": mes = "Extractation success."; break;
                    case "REGISTERING": mes = "Registering."; break;
                    case "INSTALLEDSUCCESSFULLY": mes = "Installed correctly."; break;
                    case "LOCALDELETED": mes = "Local files deleted."; break;
                    case "REGISTERYDELETED": mes = "Removed from registry."; break;
                    case "LOCALFILESMISSING": mes = "Local file missing."; break;
                    case "RUNNING": mes = "Running."; break;
                    case "NOTINSTALLED": mes = "It ain't installed."; break;
                    case "CONNECTIONREFUSED": mes = "Connection refused."; break;
                    default:
                        break;
                }
                output[i] = mes;
            }

            return output;
        }

        public static string[] splitOutput(string str)
        {
            string[] lines = new string[10];
            int count = 0;

            for (int i = 0; i < msgs.Length; i++)
            {
                string val = msgs.GetValue(i).ToString();
                if (str.Contains(val))
                {
                    lines.SetValue(val, count);
                    count++;
                }
            }
            return lines;
        }

        private void Main_Load(object sender, System.EventArgs e)
        {
            if (argv.Length > 0)
            {
                string[] uri = argv[0].Split('/');
                protocol = uri[0];
                command = uri[2];
                
                if (uri.Length >= 4) value = uri[3];
                if (uri.Length >= 5) arg1 = uri[4];
                if (uri.Length >= 6) arg2 = uri[5];

                if (uri.Length >= 4) command += (" " + value);
                if (uri.Length >= 5) command += (" " + arg1);
                if (uri.Length >= 6) command += (" " + arg2);

                command += " -t handler";

                Process proc = new Process();

                proc.StartInfo.FileName = System.IO.Path.GetDirectoryName(Application.ExecutablePath) + "\\packager.cmd";
                proc.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                proc.StartInfo.RedirectStandardOutput = true;
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.CreateNoWindow = true;
                proc.StartInfo.Arguments = command;
                proc.Start();

                string[] output = splitOutput(proc.StandardOutput.ReadToEnd());

                if (uri[2] != "run" && output.Length > 0)
                {
                    Summary sumForm = new Summary(procOutput(output));
                    sumForm.Show();
                }

                proc.WaitForExit();
            }
            else
            {
                MessageBox.Show("Unusefull parameter", "Fatal Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Application.Exit();
            }
        }
    }
}
