using System.Windows.Forms;

namespace PackagerAppHandler
{
    public partial class Summary : Form
    {
        public Summary(string[] output)
        {
            InitializeComponent();
            for (int i = 0; i < output.Length; i++)
            {
                if (output[i] != null)
                    listBox1.Items.Add(output[i]);
            }
        }

        private void Summary_FormClosing(object sender, FormClosingEventArgs e)
        {
            Application.Exit();
        }
    }
}
