// This would be done in the AWS Console or via AWS CLI
{
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "zacherikson329.click",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2", // CloudFront hosted zone ID
                    "DNSName": "your-cloudfront-distribution-id.cloudfront.net",
                    "EvaluateTargetHealth": false
                }
            }
        }
    ]
} 