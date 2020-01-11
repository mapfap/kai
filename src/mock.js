require('dotenv').config()
const db = require('./config/db')

const resetCollection = (name, data) => {
  db.getDb().collection(name).deleteMany({}, (err, docs) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Deleted ${docs.deletedCount} ${name}`)
    }
  })

  db.getDb().collection(name).insertMany(data, (err, docs) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Inserted ${docs.insertedCount} ${name}`)
    }
  })
}

db.connect().then(result => {
  console.log(result)

  // tag confidence?
  // thai en keyboard translation
  // supplies

  const tags = [
    { type: 'model', id: 'unicorn', th: 'ยูนิคอร์น', alts: ['ยุนิคอน', 'ยูนิคอน', 'yunicon'] },
    { type: 'model', id: 'corgi', th: 'คอร์กี้', alts: ['cogi', 'coki', 'คอกี้'] },
    { type: 'model', id: 'shiba', th: 'ชิบะ', alts: ['shiba inu', 'shiabainu', 'หมาชิบะ'] },
    { type: 'model', id: 'duck', th: 'เป็ด', alts: [] },
    { type: 'model', id: 'cat', th: 'แมว', alts: [] },
    { type: 'model', id: 'dog', th: 'หมา', alts: ['สุนัข'] },
    { type: 'model', id: 'pet', th: 'สัตว์', alts: [] },
    { type: 'color', id: 'white', th: 'สีขาว', alts: ['ขาว'] },
    { type: 'color', id: 'yellow', th: 'สีชมพู', alts: ['ชมพู'] },
    { type: 'color', id: 'pink', th: 'สีชมพู', alts: ['ชมพู'] },
    { type: 'color', id: 'brown', th: 'สีน้ำตาล', alts: ['น้ำตาล', 'นำตาล'] },
    { type: 'color', id: 'grey', th: 'สีเทา', alts: ['เทา', 'grey'] },
    { type: 'brand', id: 'minion', th: 'มินเนี่ยน', alts: ['มิเนียน', 'มิเนิยน'] },
    { type: 'brand', id: 'pusheen', th: 'พุชชีน', alts: ['puseen', 'พุชชิน'] }
  ]

  const relationships = [
    {
      id: 'pet',
      children: ['dog', 'cat', 'duck', 'unicorn']
    },
    {
      id: 'dog',
      children: ['shiba', 'corgi']
    }
  ]

  const products = [
    {
      code: '1439212214',
      name: 'ยูนิคอร์น Minion',
      tags: ['unicorn', 'white', 'unicorn', 'minion'],
      variations: [
        {
          sku: '1439212214-R',
          price: 950.00
        }
      ]
    },
    {
      code: '1570204598',
      name: 'หมาชิบะ',
      tags: ['shiba', 'brown'],
      variations: [
        {
          sku: '1570204598-R',
          price: 850.00
        }
      ]
    },
    {
      code: '1458048066',
      name: 'พุชชีน',
      tags: ['cat', 'gray', 'pusheen'],
      variations: [
        {
          sku: '1458048066-R',
          price: 850.00
        }
      ]
    },
    {
      code: '1578328898',
      name: 'เป็ดน้อย',
      tags: ['duck', 'yellow'],
      variations: [
        {
          sku: '1578328898-S',
          name: 'ไซส์ S',
          price: 450.00
        },
        {
          sku: '1578328898-M',
          name: 'ไซส์ M',
          price: 550.00
        },
        {
          sku: '1578328898-L',
          name: 'ไซส์ L',
          price: 850.00
        }
      ]
    },
    {
      code: '15734804121',
      name: 'คอร์กี้น้อย',
      tags: ['corgi', 'brown'],
      variations: [
        {
          sku: '15734804121-R',
          price: 1150.00
        }
      ]
    }
  ]

  resetCollection('products', products)
  resetCollection('tags', tags)
  resetCollection('relationships', relationships)
}).catch(err => {
  console.error('Unable to connect to database, terminating the service..')
  console.error(err)
  process.exit(-1)
})
