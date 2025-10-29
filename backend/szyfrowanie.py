import bcrypt

# example password
password = 'dupa'

# converting password to array of bytes
bytes = password.encode('utf-8')

# generating the salt
salt = bcrypt.gensalt()

# Hashing the password
hash = bcrypt.hashpw(bytes, salt)

hash2 = hash.decode('utf-8')

print(hash2)