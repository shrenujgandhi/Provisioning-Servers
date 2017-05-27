#/usr/bin/python
 
import boto.ec2
import time 
import os

conn = boto.ec2.connect_to_region ("us-west-2",
                                   aws_access_key_id =  os.environ["AWS_ACCESS_KEY"],
                                   aws_secret_access_key = os.environ["AWS_SECRET_ACCESS_KEY"])

response = conn.run_instances(
    'ami-6ac2a85a',
    key_name='Shrenuj',
    instance_type='t1.micro',
    security_groups=['launch-wizard-1']
)

instance = response.instances[0]

while (instance.state == 'pending'):
    print instance.state
    time.sleep(5)
    instance.update()

print instance.state
ip_address = instance.ip_address
print ip_address