"""change user password column name to hash

Revision ID: b303a6ec25d7
Revises: 3549dc4d94e8
Create Date: 2020-10-11 12:49:03.627800

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b303a6ec25d7'
down_revision = '3549dc4d94e8'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user', 'password', new_column_name='hashed_password')


def downgrade():
    op.alter_column('user', 'hashed_password', new_column_name='password')
