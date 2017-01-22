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
                    case "NOPACKAGEINSTALLED": mes = "Hiç kurulu paket yok."; break;
                    case "NOVERSIONFOUND": mes = "Bu pakete ait sürüm yok. Kurulum yapılamaz"; break;
                    case "NOVERSION": mes = "Bu pakete ait sürüm yok. Kurulum yapılamaz"; break;
                    case "PACKAGENOTFOUND": mes = "Belirtilen paket bulunamadı. Paket kodunuz hatalı veya yerel deponuz eski olabilir"; break;
                    case "PACKAGEFOUND": mes = "Paket bulundu."; break;
                    case "ALREADYINSTALLED": mes = "Bu paket zaten kurulmuş."; break;
                    case "CONNECTIONESTABILISHED": mes = "Bağlantı sağlandı."; break;
                    case "DOWNLOADING": mes = "İndiriliyor."; break;
                    case "CONNECTIONERROR": mes = "Bağlantı hatası."; break;
                    case "DOWNLOADED": mes = "İndirme tamamlandı."; break;
                    case "EXTRACTBEGIN": mes = "Arşivden çıkartma başlandı."; break;
                    case "EXTRACTSUCCESS": mes = "Arşivden çıkartma başarılı."; break;
                    case "REGISTERING": mes = "Kayıt ediliyor."; break;
                    case "INSTALLEDSUCCESSFULLY": mes = "Başarıyla kuruldu."; break;
                    case "LOCALDELETED": mes = "Yerel dosyalar silindi."; break;
                    case "REGISTERYDELETED": mes = "Kayıtlardan silindi."; break;
                    case "LOCALFILESMISSING": mes = "Yerel dosyalar kayıp."; break;
                    case "RUNNING": mes = "Çalıştırılıyor."; break;
                    case "NOTINSTALLED": mes = "Bu paket kurulu değil."; break;
                    case "CONNECTIONREFUSED": mes = "Bağlantı reddedildi."; break;
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

                Summary sumForm = new Summary(procOutput(output));
                sumForm.Show();

                proc.WaitForExit();
            }
            else
            {
                MessageBox.Show("Parametre hatalı", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
