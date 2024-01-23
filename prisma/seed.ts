import * as bcrypt from 'bcrypt';

import {
  PrismaClient,
  RoleCodeEnum,
  RoleOnUserStatusEnum,
} from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  console.log('Starting seeds ...');

  const rolesData: { role_code: RoleCodeEnum; name: string }[] = [
    { role_code: RoleCodeEnum.ADMIN, name: 'Admin' },
    { role_code: RoleCodeEnum.STUDENT, name: 'Client' },
  ];

  for (let i = 0; i < rolesData.length; i++) {
    const roleData = rolesData[i];
    console.log(`Creating role ${roleData.name} ...`);
    const role = await prisma.role.upsert({
      where: { role_code: roleData.role_code },
      update: {},
      create: {
        role_code: roleData.role_code,
        name: roleData.name,
      },
    });
    console.log(`Role ${role.name} with code ${role.role_code} upserted!`);
  }

  const adminsData: {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
  }[] = [
    {
      email: 'fedirouatbi@gmail.com',
      first_name: 'Fedi',
      last_name: 'Rouatbi',
      user_name: 'fedirouatbi',
    },
  ];

  for (let i = 0; i < adminsData.length; i++) {
    const adminData = adminsData[i];
    const password = '123456' + adminData.user_name;
    const password_hash = await bcrypt.hash(password, 1);
    console.log(`Creating admin ${adminData.user_name} ...`);
    const admin = await prisma.user.upsert({
      where: { user_name: adminData.user_name },
      update: {},
      create: {
        first_name: adminData.first_name,
        last_name: adminData.last_name,
        user_name: adminData.user_name,
        force_reset_password: true,
        password_hash,
        email: { create: { email_value: adminData.email } },
        roles_on_users: {
          create: [
            {
              status: RoleOnUserStatusEnum.ACTIVE,
              role: { connect: { role_code: RoleCodeEnum.ADMIN } },
            },
          ],
        },
      },
    });
    console.log(
      `Admin ${admin.first_name} with username ${admin.user_name} upserted!`,
    );
  }
  console.log('Finished seeds!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
