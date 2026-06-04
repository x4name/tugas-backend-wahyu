'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Skills', [
      { nama:'HTML & CSS', kategori: 'Frontend', level:'Mahir',
        icon:'🌐', deskripsi:'Membuat tampilan website modern.',
        createdAt: new Date(), updatedAt: new Date() },
      { nama:'JavaScript', kategori: 'Frontend', level:'Menengah',
        icon:'⚡', deskripsi:'Logika dan interaktivitas web.',
        createdAt: new Date(), updatedAt: new Date() },
      { nama:'React', kategori: 'Frontend', level:'Menengah',
        icon:'⚛️', deskripsi:'Single Page Application.',
        createdAt: new Date(), updatedAt: new Date() },
      { nama:'Express.js', kategori: 'Backend', level:'Pemula',
        icon:'💻', deskripsi:'REST API Development.',
        createdAt: new Date(), updatedAt: new Date() },
      { nama:'Sequelize', kategori: 'Backend', level:'Pemula',
        icon:'🗄️', deskripsi:'ORM untuk mengelola database MySQL.',
        createdAt: new Date(), updatedAt: new Date() },
      { nama:'mySQL', kategori: 'Database', level:'Pemula',
        icon:'🗃️', deskripsi:'Manajemen database relasional.',
        createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Skills', null, {});
  }
};
