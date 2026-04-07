// src/lib/content.ts – All 6 MS Word learning modules
// Ported from PHP data/content.php

export interface QuizQuestion {
  question: string;
  options: Record<"a" | "b" | "c" | "d", string>;
  answer: "a" | "b" | "c" | "d";
}

export interface ModuleSection {
  title: string;
  points: string[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  color: string;
  colorLight: string;
  icon: string;
  estimatedMinutes: number;
  sections: ModuleSection[];
  tips: string[];
  quiz: QuizQuestion[];
}

export const MODULES: Record<number, Module> = {
  1: {
    id: 1,
    title: "Pengenalan MS Word",
    description:
      "Kenali antarmuka, fitur dasar, dan cara memulai bekerja dengan Microsoft Word.",
    color: "#3B82F6",
    colorLight: "#EFF6FF",
    icon: "BookOpen",
    estimatedMinutes: 8,
    sections: [
      {
        title: "Apa itu Microsoft Word?",
        points: [
          "Aplikasi pengolah kata untuk membuat, mengedit, dan memformat dokumen seperti surat, laporan, dan brosur.",
          "Merupakan bagian dari <strong>Microsoft Office Suite</strong> yang memiliki fitur lengkap dan kompatibel luas.",
        ],
      },
      {
        title: "Mengenal Interface Word",
        points: [
          "<strong>Ribbon</strong> — Area berisi tab perintah: <em>Home, Insert, Design, Layout</em>, dan lainnya.",
          "<strong>Quick Access Toolbar</strong> — Bilah akses cepat untuk perintah yang sering dipakai.",
          "<strong>Status Bar</strong> — Menampilkan informasi dokumen seperti jumlah halaman dan jumlah kata.",
        ],
      },
      {
        title: "Membuat Dokumen Baru",
        points: [
          "Buka melalui <strong>File → New</strong> lalu pilih <em>Blank Document</em> atau pilih template yang tersedia.",
          "Simpan pertama kali dengan <strong>File → Save As</strong>, kemudian gunakan <kbd>Ctrl+S</kbd> untuk menyimpan perubahan.",
        ],
      },
    ],
    tips: [
      "Tekan <kbd>Ctrl+S</kbd> secara berkala agar pekerjaan tidak hilang.",
      "Pelajari keyboard shortcuts untuk meningkatkan efisiensi kerja.",
    ],
    quiz: [
      {
        question: "Apa fungsi utama dari Microsoft Word?",
        options: {
          a: "Mengedit foto dan gambar",
          b: "Membuat dan mengedit dokumen teks",
          c: "Membuat presentasi",
          d: "Mengelola database",
        },
        answer: "b",
      },
      {
        question:
          "Di mana lokasi perintah-perintah utama Word seperti Bold, Italic, dan Underline?",
        options: {
          a: "Status Bar",
          b: "Title Bar",
          c: "Ribbon (khususnya tab Home)",
          d: "Quick Access Toolbar",
        },
        answer: "c",
      },
      {
        question: "Shortcut keyboard untuk menyimpan dokumen adalah?",
        options: {
          a: "Ctrl + P",
          b: "Ctrl + S",
          c: "Ctrl + O",
          d: "Ctrl + N",
        },
        answer: "b",
      },
      {
        question:
          "Bagian interface Word yang menampilkan informasi jumlah halaman dan kata adalah?",
        options: { a: "Ruler", b: "Ribbon", c: "Status Bar", d: "Title Bar" },
        answer: "c",
      },
      {
        question: "Apa kegunaan Ruler dalam Microsoft Word?",
        options: {
          a: "Untuk menggambar garis lurus",
          b: "Untuk mengukur panjang dokumen",
          c: "Untuk mengatur margin dan indentasi",
          d: "Untuk menampilkan nomor halaman",
        },
        answer: "c",
      },
    ],
  },

  2: {
    id: 2,
    title: "Menyisipkan Gambar",
    description:
      "Pelajari cara menyisipkan, mengatur ukuran, dan mengatur posisi gambar dalam dokumen.",
    color: "#8B5CF6",
    colorLight: "#F5F3FF",
    icon: "Image",
    estimatedMinutes: 8,
    sections: [
      {
        title: "Menyisipkan Gambar",
        points: [
          "Klik <strong>Insert → Pictures</strong> untuk memasukkan gambar dari komputer Anda.",
          "Gunakan <strong>Online Pictures</strong> untuk mencari dan menyisipkan gambar langsung dari internet.",
        ],
      },
      {
        title: "Mengatur Ukuran Gambar",
        points: [
          "Tarik <strong>sudut gambar</strong> (bukan sisi) untuk memperbesar atau memperkecil secara proporsional.",
          "Gunakan fitur <strong>Crop</strong> untuk memotong bagian gambar yang tidak diperlukan.",
        ],
      },
      {
        title: "Mengatur Posisi Gambar",
        points: [
          "Klik gambar lalu pilih <strong>Text Wrapping</strong> untuk mengatur posisi gambar relatif terhadap teks.",
          "<strong>Square</strong> — Teks mengelilingi gambar di semua sisi.",
          "<strong>In Line with Text</strong> — Gambar diperlakukan seperti karakter teks biasa.",
        ],
      },
    ],
    tips: [
      "Selalu tarik dari <strong>sudut</strong> gambar agar proporsi tidak berubah.",
      "Gunakan fitur <strong>Compress Pictures</strong> jika ukuran file Word menjadi terlalu besar.",
    ],
    quiz: [
      {
        question: "Menu apa yang digunakan untuk memasukkan gambar dari komputer?",
        options: {
          a: "Home → Pictures",
          b: "Insert → Pictures",
          c: "Design → Images",
          d: "Layout → Pictures",
        },
        answer: "b",
      },
      {
        question: "Bagaimana cara memperbesar atau memperkecil gambar dengan benar?",
        options: {
          a: "Tarik dari tengah gambar",
          b: "Tarik dari sudut gambar",
          c: "Klik gambar lalu ketik ukuran",
          d: "Gunakan zoom",
        },
        answer: "b",
      },
      {
        question: "Text Wrapping \"Square\" berguna untuk?",
        options: {
          a: "Membuat gambar berbentuk kotak",
          b: "Membuat teks mengelilingi gambar",
          c: "Menghapus gambar",
          d: "Mengubah warna gambar",
        },
        answer: "b",
      },
      {
        question: "Apa fungsi dari Crop pada gambar?",
        options: {
          a: "Memperbesar gambar",
          b: "Mengubah warna gambar",
          c: "Memotong bagian gambar yang tidak perlu",
          d: "Menghapus gambar",
        },
        answer: "c",
      },
      {
        question:
          "Jika gambar terlalu besar dan membuat file Word berat, apa yang harus dilakukan?",
        options: {
          a: "Hapus gambar",
          b: "Perkecil ukuran gambar dengan tarik sudut",
          c: "Gunakan fitur Compress Pictures",
          d: "Tidak ada yang bisa dilakukan",
        },
        answer: "c",
      },
    ],
  },

  3: {
    id: 3,
    title: "Format Teks",
    description:
      "Kuasai pengaturan font, format dasar teks, serta pemberian warna dan highlight.",
    color: "#F59E0B",
    colorLight: "#FFFBEB",
    icon: "Type",
    estimatedMinutes: 7,
    sections: [
      {
        title: "Mengatur Font",
        points: [
          "Pilih teks terlebih dahulu, lalu gunakan dropdown <strong>Font</strong> di tab <em>Home</em>.",
          "Font umum yang direkomendasikan: <strong>Arial</strong>, <strong>Times New Roman</strong>, <strong>Calibri</strong>.",
        ],
      },
      {
        title: "Format Dasar Teks",
        points: [
          "<strong>Bold</strong> (<kbd>Ctrl+B</kbd>), <strong>Italic</strong> (<kbd>Ctrl+I</kbd>), <strong>Underline</strong> (<kbd>Ctrl+U</kbd>).",
          "<strong>Strikethrough</strong> — Teks dicoret. <strong>Subscript</strong> — Teks kecil di bawah (H₂O). <strong>Superscript</strong> — Teks kecil di atas (m²).",
        ],
      },
      {
        title: "Warna dan Highlight",
        points: [
          "<strong>Font Color</strong> — Mengubah warna teks agar lebih menarik atau mudah dibaca.",
          "<strong>Text Highlight</strong> — Memberi warna latar belakang pada teks penting.",
        ],
      },
    ],
    tips: [
      "Gunakan maksimal <strong>2–3 jenis font</strong> dalam satu dokumen agar tampak profesional.",
      "Ukuran font <strong>minimal 11pt</strong> untuk body text agar mudah dibaca.",
    ],
    quiz: [
      {
        question: "Shortcut keyboard untuk membuat teks Bold (tebal) adalah?",
        options: { a: "Ctrl + I", b: "Ctrl + U", c: "Ctrl + B", d: "Ctrl + T" },
        answer: "c",
      },
      {
        question:
          "Fitur apa yang digunakan untuk memberi warna latar belakang pada teks?",
        options: {
          a: "Font Color",
          b: "Text Highlight",
          c: "Shading",
          d: "Background Color",
        },
        answer: "b",
      },
      {
        question:
          "Ukuran font minimal yang disarankan untuk body text agar mudah dibaca adalah?",
        options: { a: "8 pt", b: "10 pt", c: "11 pt", d: "14 pt" },
        answer: "c",
      },
      {
        question: "Apa yang dimaksud dengan Superscript?",
        options: {
          a: "Teks yang lebih besar dari normal",
          b: "Teks yang dicetak tebal",
          c: "Teks kecil di atas garis normal (seperti pangkat dalam matematika)",
          d: "Teks dengan garis bawah",
        },
        answer: "c",
      },
      {
        question:
          "Berapa maksimal jenis font yang disarankan dalam satu dokumen?",
        options: {
          a: "1–2 jenis",
          b: "2–3 jenis",
          c: "4–5 jenis",
          d: "Tidak ada batasan",
        },
        answer: "b",
      },
    ],
  },

  4: {
    id: 4,
    title: "Menyisipkan Tabel",
    description:
      "Pelajari cara membuat, mengedit struktur, dan memformat tabel secara profesional.",
    color: "#14B8A6",
    colorLight: "#F0FDFA",
    icon: "Table",
    estimatedMinutes: 9,
    sections: [
      {
        title: "Menyisipkan Tabel",
        points: [
          "Klik <strong>Insert → Table</strong>, lalu pilih jumlah kolom dan baris dengan grid.",
          "Gunakan <strong>Quick Tables</strong> untuk langsung memakai template tabel siap pakai.",
        ],
      },
      {
        title: "Mengedit Struktur Tabel",
        points: [
          "<strong>Insert/Delete Row dan Column</strong> — Klik kanan di dalam tabel untuk menambah atau menghapus baris/kolom.",
          "<strong>Merge Cells</strong> — Menggabungkan beberapa sel menjadi satu.",
          "<strong>Split Cells</strong> — Memecah satu sel menjadi beberapa sel.",
        ],
      },
      {
        title: "Memformat Tabel",
        points: [
          "<strong>Table Styles</strong> — Desain tabel profesional secara otomatis dengan satu klik.",
          "<strong>Shading, Borders, dan Alignment</strong> — Kustomisasi tampilan sel secara manual.",
        ],
      },
    ],
    tips: [
      "Manfaatkan <strong>Table Styles</strong> untuk menjaga konsistensi tampilan tabel.",
      "Aktifkan <strong>Repeat Header Rows</strong> pada tabel yang panjang agar header muncul di setiap halaman.",
    ],
    quiz: [
      {
        question: "Bagaimana cara tercepat menyisipkan tabel 3×3 di Word?",
        options: {
          a: "Insert → Table → ketik 3×3",
          b: "Insert → Table → gunakan grid pilih 3 kolom dan 3 baris",
          c: "Draw Table",
          d: "Insert → Quick Tables",
        },
        answer: "b",
      },
      {
        question: "Apa fungsi dari Merge Cells?",
        options: {
          a: "Memecah satu sel menjadi beberapa sel",
          b: "Menggabungkan beberapa sel menjadi satu",
          c: "Menghapus sel",
          d: "Menyalin sel",
        },
        answer: "b",
      },
      {
        question:
          "Fitur apa yang berguna untuk tabel panjang yang melintasi beberapa halaman?",
        options: {
          a: "Table Styles",
          b: "Repeat Header Rows",
          c: "AutoFit",
          d: "Convert to Text",
        },
        answer: "b",
      },
      {
        question: "Apa yang dimaksud dengan Table Styles?",
        options: {
          a: "Cara menggambar tabel",
          b: "Ukuran tabel",
          c: "Desain dan format tabel yang sudah jadi",
          d: "Jumlah kolom dalam tabel",
        },
        answer: "c",
      },
      {
        question: "Bagaimana cara menambah baris baru di dalam tabel?",
        options: {
          a: "Klik kanan di tabel → Insert Row",
          b: "Tekan Enter",
          c: "Insert → Row",
          d: "Tidak bisa menambah baris",
        },
        answer: "a",
      },
    ],
  },

  5: {
    id: 5,
    title: "Mengatur Halaman",
    description:
      "Atur ukuran kertas, orientasi, margin, dan cara memulai halaman baru.",
    color: "#EC4899",
    colorLight: "#FDF2F8",
    icon: "Layout",
    estimatedMinutes: 8,
    sections: [
      {
        title: "Ukuran Kertas",
        points: [
          "Klik <strong>Layout → Size</strong> untuk memilih ukuran kertas.",
          "<strong>A4</strong> adalah ukuran kertas yang paling sering digunakan untuk dokumen formal dan tugas sekolah.",
        ],
      },
      {
        title: "Orientasi Kertas",
        points: [
          "<strong>Portrait</strong> — Kertas berdiri (tegak). Cocok untuk surat, laporan, dan dokumen teks.",
          "<strong>Landscape</strong> — Kertas mendatar (tidur). Cocok untuk tabel lebar atau materi presentasi.",
        ],
      },
      {
        title: "Margin (Batas Pinggir)",
        points: [
          "Klik <strong>Layout → Margins</strong> untuk mengatur jarak konten dari pinggir kertas.",
          "<strong>Normal</strong> adalah pengaturan margin paling umum untuk dokumen standar.",
        ],
      },
      {
        title: "Memulai Halaman Baru",
        points: [
          "Tekan <kbd>Ctrl+Enter</kbd> untuk menyisipkan <em>Page Break</em> dan memulai halaman baru.",
          "Gunakan saat ingin memulai bab baru agar konten tidak terputus secara tidak rapi.",
        ],
      },
    ],
    tips: [
      "Gunakan ukuran <strong>A4</strong> untuk tugas sekolah dan dokumen formal.",
      "<strong>Portrait</strong> cocok untuk surat; <strong>Landscape</strong> cocok untuk tabel yang lebar.",
    ],
    quiz: [
      {
        question:
          "Ukuran kertas yang paling sering dipakai untuk tugas sekolah adalah?",
        options: { a: "Letter", b: "Legal", c: "A4", d: "F4" },
        answer: "c",
      },
      {
        question: "Kertas Portrait artinya?",
        options: {
          a: "Kertas tidur (mendatar)",
          b: "Kertas berdiri (tegak)",
          c: "Kertas berbentuk persegi",
          d: "Kertas ukuran kecil",
        },
        answer: "b",
      },
      {
        question: "Apa fungsi dari Margin?",
        options: {
          a: "Mengatur warna halaman",
          b: "Mengatur jarak konten dari pinggir kertas",
          c: "Mengatur ukuran huruf",
          d: "Mengatur jumlah halaman",
        },
        answer: "b",
      },
      {
        question: "Cara tercepat untuk membuat halaman baru adalah?",
        options: {
          a: "Tekan Enter berkali-kali",
          b: "Tekan Ctrl + Enter",
          c: "Insert → New Page",
          d: "Tekan Space berkali-kali",
        },
        answer: "b",
      },
      {
        question: "Kapan kita menggunakan kertas Landscape (mendatar)?",
        options: {
          a: "Untuk surat",
          b: "Untuk tabel yang lebar",
          c: "Untuk cerita panjang",
          d: "Selalu harus Landscape",
        },
        answer: "b",
      },
    ],
  },

  6: {
    id: 6,
    title: "Menyimpan Dokumen",
    description:
      "Pelajari cara menyimpan, membuka, dan mengelola format file dokumen Word.",
    color: "#10B981",
    colorLight: "#ECFDF5",
    icon: "Save",
    estimatedMinutes: 7,
    sections: [
      {
        title: "Menyimpan Dokumen Baru",
        points: [
          "Klik <strong>File → Save As</strong> untuk menyimpan dokumen untuk pertama kalinya.",
          "Pilih lokasi penyimpanan (komputer atau OneDrive) dan beri nama yang jelas.",
        ],
      },
      {
        title: "Menyimpan Perubahan",
        points: [
          "Tekan <kbd>Ctrl+S</kbd> atau klik ikon <strong>Save</strong> di Quick Access Toolbar.",
          "Simpan secara berkala agar pekerjaan tidak hilang jika komputer tiba-tiba mati.",
        ],
      },
      {
        title: "Membuka Dokumen",
        points: [
          "Klik <strong>File → Open</strong> atau tekan <kbd>Ctrl+O</kbd> untuk membuka dokumen.",
          "Dokumen baru-baru ini juga muncul di bagian <em>Recent</em> pada halaman Start.",
        ],
      },
      {
        title: "Format File",
        points: [
          "<strong>.docx</strong> — Format Word paling umum, kompatibel dengan semua versi modern.",
          "Simpan sebagai <strong>PDF</strong> (File → Save As PDF) untuk dokumen final yang tidak perlu diedit.",
        ],
      },
    ],
    tips: [
      "Simpan dokumen setiap beberapa menit dengan <kbd>Ctrl+S</kbd>.",
      "Beri nama file yang jelas dan deskriptif agar mudah dicari kembali.",
    ],
    quiz: [
      {
        question: "Shortcut keyboard untuk menyimpan dokumen adalah?",
        options: {
          a: "Ctrl + O",
          b: "Ctrl + S",
          c: "Ctrl + P",
          d: "Ctrl + N",
        },
        answer: "b",
      },
      {
        question: "Apa perbedaan Save dan Save As?",
        options: {
          a: "Tidak ada bedanya",
          b: "Save untuk menyimpan perubahan, Save As untuk menyimpan dengan nama/lokasi baru",
          c: "Save As lebih cepat",
          d: "Save hanya untuk file baru",
        },
        answer: "b",
      },
      {
        question: "Format file Word yang paling umum adalah?",
        options: { a: ".txt", b: ".pdf", c: ".docx", d: ".jpg" },
        answer: "c",
      },
      {
        question: "Mengapa kita perlu sering menyimpan dokumen saat bekerja?",
        options: {
          a: "Agar file lebih besar",
          b: "Agar komputer lebih cepat",
          c: "Agar pekerjaan tidak hilang jika komputer error",
          d: "Tidak perlu sering-sering",
        },
        answer: "c",
      },
      {
        question: "Untuk membuka dokumen yang pernah disimpan, kita gunakan?",
        options: {
          a: "File → New",
          b: "File → Open atau Ctrl + O",
          c: "File → Print",
          d: "File → Close",
        },
        answer: "b",
      },
    ],
  },
};

export const TOTAL_MODULES = Object.keys(MODULES).length;
