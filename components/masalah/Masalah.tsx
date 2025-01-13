const Masalah = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Kenapa Ini Penting?
      </h2>
      <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
        <li className="flex items-start gap-3">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
            1
          </span>
          Memahami komentar terkait aspek pekerjaan Generasi Z dapat memberikan
          wawasan bagi Human Resource.
        </li>
        <li className="flex items-start gap-3">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
            2
          </span>
          Analisis sentimen untuk mengetahui bagaimana publik menilai pekerjaan
          Generasi Z dari sisi positif dan negatif.
        </li>
      </ul>
    </div>
  );
};

export default Masalah;
