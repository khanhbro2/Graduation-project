import React, { useState } from 'react';
import { At, Mailbox } from 'tabler-icons-react';

// Giả lập nội dung file
const simulatedFileContent = '........';

function ClientHomeNewsletter() {
  const [email, setEmail] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (email.endsWith('@gmail.com')) {
      // Giả lập việc đọc file
      setFileContent(simulatedFileContent);
    } else {
      setFileContent('');
    }
  };

  return (
    <div className="rounded-md shadow-sm p-6 bg-blue-600 dark:bg-blue-900 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Mailbox size={40} strokeWidth={1} />
          <p className="text-xl font-medium">Đăng ký nhận tin</p>
          <p className="text-base">và cập nhật khuyến mãi liên tục...</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-[450px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <At size={16} className="text-white/70" />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Địa chỉ email"
              className="w-full pl-10 pr-3 py-2 rounded-md border-none bg-white/25 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#14372fe4] hover:bg-[#14372fd4] rounded-md transition-colors whitespace-nowrap"
          >
            Gửi
          </button>
        </div>
      </div>
      {fileContent && (
        <p className="mt-4">
          {fileContent}
        </p>
      )}
    </div>
  );
}

export default ClientHomeNewsletter;
