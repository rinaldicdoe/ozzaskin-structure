import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Table, Network, Search, X } from 'lucide-react';

/**
 * Komponen OzzaskinOrgChart
 * * Komponen ini menampilkan struktur organisasi perusahaan Ozzaskin
 * dalam dua mode tampilan: Peta Pikiran (Mind Map) interaktif dan Tabel.
 * Fitur termasuk pencarian real-time dan panel detail untuk setiap item.
 */
const OzzaskinOrgChart = () => {
  // State untuk mengelola mode tampilan ('mindmap' atau 'table')
  const [view, setView] = useState('mindmap');
  // State untuk melacak node mana yang sedang diperluas di Peta Pikiran
  const [expandedNodes, setExpandedNodes] = useState({});
  // State untuk menyimpan istilah pencarian dari input pengguna
  const [searchTerm, setSearchTerm] = useState('');
  // State untuk menyimpan item yang dipilih untuk ditampilkan di panel detail
  const [selectedItem, setSelectedItem] = useState(null);

  // Data mentah struktur organisasi. Di dunia nyata, ini idealnya diambil dari API.
  const orgData = {
    "BUSINESS DEVELOPMENT": {
      description: "Fungsi Business Development bertanggung jawab untuk mengidentifikasi dan mengembangkan peluang bisnis baru, menjalin kemitraan strategis, serta merancang strategi pertumbuhan jangka panjang perusahaan.",
      sections: {
        "Strategic Planning": "Merumuskan strategi pengembangan bisnis jangka pendek dan jangka panjang untuk meningkatkan pertumbuhan perusahaan.",
        "Market Research & Analysis": "Melakukan riset pasar & market size, analisis tren industri, dan pemetaan kompetitor untuk menemukan peluang bisnis baru.",
        "Partnership & Networking": "Membangun dan mengelola hubungan dengan mitra strategis, distributor, dan pihak eksternal untuk memperluas jaringan bisnis.",
        "Innovation & Product Development Support": "Memberikan masukan untuk pengembangan produk baru sesuai kebutuhan pasar dan tren industri.",
        "Regulatory Affairs": "Memastikan seluruh produk dan proses produksi memenuhi persyaratan regulasi seperti izin edar BPOM, sertifikasi Halal."
      }
    },
    "SALES & MARKETING": {
      description: "Merancang strategi pemasaran dan mengelola proses penjualan, menetapkan target, dan memastikan pencapaian revenue sesuai rencana perusahaan.",
      sections: {
        "Promotions & Campaign Management": "Merencanakan dan mengeksekusi program promosi, diskon, dan event untuk meningkatkan penjualan & awareness.",
        "Branding": "Membangun brand awareness, dan memastikan citra merek sesuai dengan positioning perusahaan",
        "Advertising": "Mengelola kampanye online iklan berbayar melalui platform media sosial, iklan digital, SEO, dan e commerce.",
        "Content Creation": "Membuat konten (video, foto, copywriting) yang menarik untuk mendukung kampanye dan promosi pemasaran",
        "Customer Relationship Management": "Menjaga hubungan baik dengan pelanggan, mengelola database pelanggan, dan meningkatkan loyalitas.",
        "Sales (CS Hunter)": "Melakukan konversi lead yang masuk menjadi penjualan, baik secara offline maupun online.",
        "Key Account Management": "Melakukan penjualan ke mitra utama, serta menjaga hubungan jangka panjang.",
        "Sales Administration": "Mengelola administrasi penjualan seperti input data pesanan, pembuatan invoice, pengelolaan dokumen.",
        "KOL & Affiliator Management": "Mengelola kerja sama dengan Key Opinion Leader dan program afiliasi untuk meningkatkan brand awareness.",
        "Community Management": "Membangun, mengelola, dan mengembangkan komunitas pelanggan untuk engagement yang kuat.",
        "Live Streaming Management": "Mengelola kegiatan live streaming di platform seperti TikTok, Shopee Live untuk interaksi langsung.",
        "Buzzer Management": "Membuat konten pendek yang menarik untuk platform TikTok, Reels, dan YouTube Shorts."
      }
    },
    "SUPPLY CHAIN MANAGEMENT (SCM)": {
      description: "SCM berfungsi untuk mengelola seluruh alur distribusi produk mulai dari pengadaan barang jadi, pengelolaan stok, penyimpanan di gudang, hingga pengiriman ke pelanggan.",
      sections: {
        "Procurement": "Bertanggung jawab untuk pengadaan barang yang akan dijual dan barang pendukung dengan harga dan kualitas terbaik.",
        "Inventory Management": "Mengelola stok barang agar selalu tersedia sesuai kebutuhan tanpa overstock atau kekurangan.",
        "Warehouse Management": "Mengatur penyimpanan produk di gudang agar tertata rapi sesuai FEFO, aman, dan sesuai standar BPOM.",
        "Quality Control (QC)": "Memastikan produk yang diterima dari supplier dan disimpan di gudang sesuai standar kualitas dan regulasi BPOM.",
        "Administrative Recording": "Mengelola dokumen dan data terkait pengadaan, penerimaan barang, stok, pengiriman.",
        "Fulfillment": "Menangani proses pemenuhan pesanan pelanggan, mulai dari picking, packing, hingga pengiriman.",
        "Demand Planning & Forecasting": "Mengkalkulasi dan merencanakan kebutuhan stok sesuai dengan tren pasar dan rencana penjualan.",
        "Penanggung Jawab Teknis (PJT)": "Memastikan seluruh proses penyimpanan dan distribusi produk kosmetik sesuai dengan regulasi BPOM.",
        "Outbound Delivery": "Mengatur pengiriman produk ke pelanggan melalui platform dengan tepat waktu dan aman.",
        "Return Handling": "Mengelola proses pengembalian produk dari pelanggan, termasuk pengecekan kondisi barang.",
        "Delivery Issue & Claim Management": "Menangani masalah pengiriman seperti keterlambatan, kerusakan, atau kehilangan barang.",
        "Export Management": "Mengelola pengiriman produk jadi dari Indonesia ke luar negeri dengan dokumen yang lengkap.",
        "Import Management": "Mengelola proses pembelian bahan baku atau kemasan dari luar negeri sesuai regulasi."
      }
    },
    "FINANCE, ACCOUNTING, TAX": {
      description: "Berfungsi untuk mengelola seluruh aspek keuangan perusahaan agar operasional berjalan sehat, transparan, dan sesuai regulasi.",
      subsections: {
        "FINANCE": {
          "Treasury & Cash Management": "Mengelola arus kas harian, proyeksi kas, saldo rekening bank untuk menjaga likuiditas yang sehat.",
          "Budgeting & Forecasting": "Menyusun anggaran tahunan dan proyeksi keuangan berkala, memonitor realisasi vs anggaran.",
          "Financial Planning & Analysis": "Menyediakan analisis kinerja keuangan sebagai dasar pengambilan keputusan manajemen.",
          "Working Capital Management": "Mengoptimalkan modal kerja melalui pengelolaan piang, persediaan, dan utang dagang.",
          "Overseas Payment/Receiving": "Merencanakan metode penerimaan dan pembayaran dari atau ke luar negeri yang efisien."
        },
        "ACCOUNTING": {
          "General Ledger & Chart of Accounts": "Menjaga struktur akun dan pencatatan transaksi sesuai standar akuntansi yang berlaku.",
          "Accounts Payable & Receivable": "Mengelola pencatatan pembelian dan penjualan, verifikasi invoice, penjadwalan pembayaran.",
          "Fixed Assets & Depreciation": "Mencatat perolehan, mutasi, dan pelepasan aset tetap serta perhitungan depresiasi.",
          "Inventory Accounting & COGS": "Mencatat dan merekonsiliasi persediaan serta menghitung harga pokok penjualan yang tepat.",
          "Period-End Closing": "Menjalankan proses tutup buku bulanan/kuartalan/tahunan dengan rekonsiliasi lengkap.",
          "Financial Reporting": "Menyusun laporan keuangan dan laporan statutori untuk auditor/regulator.",
          "Audit": "Melakukan audit internal untuk meminimalkan risiko kesalahan dan mendukung audit eksternal.",
          "ERP Governance": "Menjaga integritas data dan bertanggung jawab atas proses otomatisasi akuntansi."
        },
        "TAX": {
          "Tax Compliance": "Menghitung, memungut, menyetor, dan melaporkan pajak tepat waktu termasuk PPN dan PPh.",
          "Tax Planning & Advisory": "Merencanakan struktur transaksi yang efisien pajak namun tetap patuh regulasi.",
          "Withholding & Documentation": "Mengelola pemotongan pajak pihak ketiga, penerbitan bukti potong, administrasi dokumen.",
          "Tax Audit & Dispute Handling": "Menangani pemeriksaan pajak, menyiapkan keberatan/banding bila diperlukan."
        }
      }
    },
    "IT, NETWORKING & TROUBLESHOOTING": {
      description: "Bertanggung jawab atas pengelolaan seluruh sistem teknologi informasi perusahaan, termasuk infrastruktur, jaringan, keamanan, dan dukungan teknis.",
      sections: {
        "IT Infrastructure Management": "Mengelola perangkat keras dan lunak perusahaan, termasuk server, komputer, dan sistem operasional.",
        "Networking": "Membangun dan menjaga konektivitas jaringan internal dan eksternal seperti LAN, Wi-Fi, dan VPN.",
        "Troubleshooting & Technical Support": "Menangani masalah teknis pengguna sistem IT seperti gangguan perangkat dan software error.",
        "Cybersecurity & Data Protection": "Melindungi sistem dan data perusahaan dari ancaman siber, mengatur firewall dan antivirus.",
        "System Integration & Automation": "Mengintegrasikan sistem digital dan mengembangkan solusi otomatisasi untuk efisiensi.",
        "Technology Assessment": "Menilai kebutuhan teknologi perusahaan dan menentukan aplikasi yang sesuai.",
        "Software Development": "Membuat dan mengembangkan program internal sesuai kebutuhan perusahaan."
      }
    },
    "HRD (HUMAN RESOURCES DEVELOPMENT)": {
      description: "Bertanggung jawab atas pengelolaan sumber daya manusia di perusahaan, mulai dari rekrutmen, pengembangan, hingga pemeliharaan hubungan kerja yang sehat.",
      subsections: {
        "HR": {
          "Recruitment & Selection": "Menyaring dan merekrut kandidat yang sesuai dengan kebutuhan perusahaan melalui proses seleksi sistematis.",
          "Compensation & Benefits": "Mengelola sistem gaji, tunjangan, dan insentif sesuai kebijakan perusahaan dan standar pasar.",
          "HR Administration": "Mengatur dokumen dan data kepegawaian seperti kontrak kerja, absensi, cuti, dan arsip personalia.",
          "Payroll": "Menghitung dan mendistribusikan gaji karyawan secara akurat dan tepat waktu.",
          "Legal & Compliance": "Memastikan kebijakan ketenagakerjaan sesuai dengan hukum dan peraturan pemerintah."
        },
        "General Affair": {
          "Office Facility Management": "Mengelola dan merawat fasilitas kantor, termasuk kebersihan dan peralatan kerja.",
          "Asset & Inventory Control": "Mencatat, mengawasi, dan merawat aset perusahaan seperti kendaraan dan peralatan kantor.",
          "Security & Safety": "Menjaga keamanan lingkungan kerja dan memastikan penerapan standar keselamatan kerja.",
          "Transportation": "Mengatur kebutuhan transportasi operasional internal."
        },
        "Human Capital Development": {
          "Training & Development": "Merancang dan menyelenggarakan program pelatihan untuk peningkatan kompetensi karyawan.",
          "Career Path & Talent Management": "Mengelola jalur karier karyawan dan identifikasi talenta potensial.",
          "Performance Management": "Mengelola sistem penilaian kinerja karyawan dan memberikan feedback konstruktif.",
          "Culture & Engagement": "Membentuk dan menjaga budaya kerja positif serta meningkatkan keterlibatan karyawan.",
          "Employee Relations": "Menjaga hubungan kerja yang harmonis dan menangani konflik atau keluhan internal."
        }
      }
    }
  };

  /**
   * Fungsi untuk membuka/menutup node pada Peta Pikiran.
   * @param {string} nodeId - ID unik dari node yang akan di-toggle.
   */
  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  /**
   * Fungsi utilitas untuk mendapatkan kelas warna Tailwind CSS berdasarkan nama departemen.
   * @param {string} dept - Nama departemen.
   * @returns {string} - String kelas CSS.
   */
  const getColorForDept = (dept) => {
    const colors = {
      "BUSINESS DEVELOPMENT": "bg-blue-100 border-blue-300 text-blue-800",
      "SALES & MARKETING": "bg-green-100 border-green-300 text-green-800",
      "SUPPLY CHAIN MANAGEMENT (SCM)": "bg-purple-100 border-purple-300 text-purple-800",
      "FINANCE, ACCOUNTING, TAX": "bg-yellow-100 border-yellow-300 text-yellow-800",
      "IT, NETWORKING & TROUBLESHOOTING": "bg-cyan-100 border-cyan-300 text-cyan-800",
      "HRD (HUMAN RESOURCES DEVELOPMENT)": "bg-pink-100 border-pink-300 text-pink-800"
    };
    return colors[dept] || "bg-gray-100 border-gray-300 text-gray-800";
  };

  // Memoization untuk data yang difilter agar tidak dihitung ulang pada setiap render,
  // kecuali jika data asli atau searchTerm berubah.
  const filteredData = useMemo(() => {
    if (!searchTerm) return orgData;
    
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = {};

    Object.keys(orgData).forEach(dept => {
      const deptData = orgData[dept];
      let deptMatches = false;

      // Pencarian di nama dan deskripsi departemen
      if (dept.toLowerCase().includes(lowercasedFilter) || deptData.description.toLowerCase().includes(lowercasedFilter)) {
        deptMatches = true;
      }
      
      const result = {
        ...deptData,
        sections: {},
        subsections: {}
      };

      // Pencarian di dalam 'sections'
      if (deptData.sections) {
        Object.keys(deptData.sections).forEach(section => {
          if (section.toLowerCase().includes(lowercasedFilter) || deptData.sections[section].toLowerCase().includes(lowercasedFilter)) {
            result.sections[section] = deptData.sections[section];
          }
        });
      }

      // Pencarian di dalam 'subsections'
      if (deptData.subsections) {
        Object.keys(deptData.subsections).forEach(subsectionKey => {
          const subsectionData = deptData.subsections[subsectionKey];
          const matchingItems = {};

          Object.keys(subsectionData).forEach(itemKey => {
            if (itemKey.toLowerCase().includes(lowercasedFilter) || subsectionData[itemKey].toLowerCase().includes(lowercasedFilter)) {
              matchingItems[itemKey] = subsectionData[itemKey];
            }
          });

          if (Object.keys(matchingItems).length > 0 || subsectionKey.toLowerCase().includes(lowercasedFilter)) {
             result.subsections[subsectionKey] = Object.keys(matchingItems).length > 0 ? matchingItems : subsectionData;
          }
        });
      }

      // Jika ada kecocokan, tambahkan ke hasil
      if (deptMatches || Object.keys(result.sections).length > 0 || Object.keys(result.subsections).length > 0) {
        // Jika departemen cocok, tampilkan semua anak-anaknya
        // Jika tidak, tampilkan hanya anak yang cocok
        filtered[dept] = {
            ...deptData,
            sections: deptMatches ? deptData.sections : result.sections,
            subsections: deptMatches ? deptData.subsections : result.subsections,
        };
      }
    });
    
    return filtered;
  }, [searchTerm]);

  // di dalam useMemo tableData
const tableData = useMemo(() => {
  const flatData = [];
  const data = filteredData;
  Object.keys(data).forEach(dept => {
    const isSpecialDept = ["FINANCE, ACCOUNTING, TAX", "HRD (HUMAN RESOURCES DEVELOPMENT)"].includes(dept);

    if (data[dept].sections && Object.keys(data[dept].sections).length > 0) {
      Object.keys(data[dept].sections).forEach(section => {
        flatData.push({
          id: `${dept}-${section}`,
          department: dept,
          // kalau dept bukan special → section dianggap jadi "subsection"
          section: isSpecialDept ? section : "",
          subsection: isSpecialDept ? "" : section,
          function: data[dept].description,
          task: data[dept].sections[section]
        });
      });
    }
    
    if (data[dept].subsections && Object.keys(data[dept].subsections).length > 0) {
      Object.keys(data[dept].subsections).forEach(subsection => {
        Object.keys(data[dept].subsections[subsection]).forEach(item => {
          flatData.push({
            id: `${dept}-${subsection}-${item}`,
            department: dept,
            section: isSpecialDept ? subsection : "",
            subsection: isSpecialDept ? item : `${subsection} - ${item}`,
            function: data[dept].description,
            task: data[dept].subsections[subsection][item]
          });
        });
      });
    }
  });
  return flatData;
}, [filteredData]);


  /**
   * Merender tampilan Peta Pikiran (Mind Map).
   */
  const renderMindMap = () => {
    const data = filteredData;
    
    return (
      <div className="space-y-6 p-6">
        {Object.keys(data).length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada hasil yang ditemukan.</p>
        ) : Object.keys(data).map((dept) => (
          <div key={dept} className="space-y-2">
            <button 
              className={`w-full p-4 rounded-lg border-2 text-left cursor-pointer transition-all duration-200 hover:shadow-lg ${getColorForDept(dept)}`}
              onClick={() => toggleNode(dept)}
              aria-expanded={!!expandedNodes[dept]}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{dept}</h2>
                {expandedNodes[dept] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </button>
            
            {expandedNodes[dept] && (
              <div className="ml-6 space-y-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">{data[dept].description}</p>
                </div>
                
                {data[dept].sections && (
                  <div className="space-y-2">
                    {Object.keys(data[dept].sections).map((section) => (
                      <div 
                        key={section}
                        className="ml-4 p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedItem({
                          type: 'section',
                          department: dept,
                          name: section,
                          description: data[dept].sections[section]
                        })}
                        tabIndex="0"
                        role="button"
                      >
                        <h4 className="font-semibold text-gray-800">{section}</h4>
                        <p className="text-sm text-gray-600 mt-1">{data[dept].sections[section]}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {data[dept].subsections && (
                  <div className="space-y-3">
                    {Object.keys(data[dept].subsections).map((subsection) => (
                      <div key={subsection} className="ml-4">
                        <button 
                          className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer"
                          onClick={() => toggleNode(`${dept}-${subsection}`)}
                          aria-expanded={!!expandedNodes[`${dept}-${subsection}`]}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-blue-800">{subsection}</h3>
                            {expandedNodes[`${dept}-${subsection}`] ? 
                              <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </div>
                        </button>
                        
                        {expandedNodes[`${dept}-${subsection}`] && (
                          <div className="ml-6 mt-2 space-y-2">
                            {Object.keys(data[dept].subsections[subsection]).map((item) => (
                              <div 
                                key={item}
                                className="p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setSelectedItem({
                                  type: 'item',
                                  department: dept,
                                  subsection: subsection,
                                  name: item,
                                  description: data[dept].subsections[subsection][item]
                                })}
                                tabIndex="0"
                                role="button"
                              >
                                <h5 className="font-semibold text-gray-800">{item}</h5>
                                <p className="text-sm text-gray-600 mt-1">{data[dept].subsections[subsection][item]}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  /**
   * Merender tampilan Tabel.
   */
  const renderTable = () => {
    return (
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Department</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Fungsi Utama</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Section</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Function</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Tugas</th>
              </tr>
            </thead>
            <tbody>
  {tableData.length === 0 && (
    <tr>
      <td colSpan="5" className="text-center py-4 text-gray-500">
        Tidak ada hasil yang ditemukan.
      </td>
    </tr>
  )}

  {tableData.length > 0 && (() => {
    // hitung jumlah baris per department
    const deptRowCounts = tableData.reduce((acc, row) => {
      acc[row.department] = (acc[row.department] || 0) + 1;
      return acc;
    }, {});

    const renderedDepts = {}; // untuk cek apakah sudah render fungsi utama
    return tableData.map((row) => {
      const renderFunctionCell = !renderedDepts[row.department];
      if (renderFunctionCell) {
        renderedDepts[row.department] = true;
      }

      return (
        <tr key={row.id} className="bg-white even:bg-gray-50">
          {/* Department */}
          <td className="border border-gray-300 px-4 py-2 text-sm">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColorForDept(
                row.department
              )}`}
            >
              {row.department}
            </span>
          </td>

          {/* Fungsi Utama pakai rowspan */}
          {renderFunctionCell && (
            <td
              className="border border-gray-300 px-4 py-2 text-sm align-top"
              rowSpan={deptRowCounts[row.department]}
            >
              {row.function}
            </td>
          )}

          {/* Section */}
          <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
            {row.section}
          </td>

          {/* Sub-seksi */}
          <td className="border border-gray-300 px-4 py-2 text-sm">
            {row.subsection}
          </td>

          {/* Tugas */}
          <td className="border border-gray-300 px-4 py-2 text-sm">
            {row.task}
          </td>
        </tr>
      );
    });
  })()}
</tbody>
          

          </table>
        </div>
      </div>
    );
  };

  // Render utama komponen
  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Struktur Organisasi Ozzaskin</h1>
        <p className="text-blue-100">Penjelajah struktur perusahaan interaktif</p>
      </header>

      <nav className="border-b border-gray-200 p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('mindmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                view === 'mindmap' 
                  ? 'bg-white text-blue-600 shadow-sm font-semibold' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Network size={20} />
              Peta Pikiran
            </button>
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                view === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm font-semibold' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Table size={20} />
              Tabel
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari departemen, seksi, atau fungsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
            />
          </div>
        </div>
      </nav>

      <main className="flex">
        <div className={`${selectedItem ? 'w-full md:w-2/3' : 'w-full'} transition-all duration-300`}>
          {view === 'mindmap' ? renderMindMap() : renderTable()}
        </div>

        {/* Panel Detail yang muncul saat sebuah item dipilih */}
        {selectedItem && (
          <aside className="hidden md:block w-1/3 bg-gray-50 border-l border-gray-200 p-6">
            <div className="sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Informasi Detail</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-800"
                  aria-label="Tutup panel detail"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">DEPARTEMEN</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${getColorForDept(selectedItem.department)}`}>
                    {selectedItem.department}
                  </span>
                </div>
                
                {selectedItem.subsection && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Section</p>
                    <p className="text-md text-blue-700 font-semibold">{selectedItem.subsection}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Function</p>
                  <p className="text-md text-gray-900 font-semibold">{selectedItem.name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">DESKRIPSI TUGAS</p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-md border">{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 p-4 mt-8">
        <p className="text-center text-sm text-gray-600">
          Bagan Organisasi Ozzaskin - Penjelajah Interaktif
        </p>
      </footer>
    </div>
  );
};

export default OzzaskinOrgChart;