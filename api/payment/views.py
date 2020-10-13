from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import braintree
# Create your views here.

gateway = braintree.BraintreeGateway(
  braintree.Configuration(
    environment=braintree.Environment.Sandbox,
    merchant_id='dkz5qydrwtvc58sp',
    public_key='32pcg7sg3t74n98d',
    private_key='556d191f7267071e4145bab070fa4939'
  )
)

def validate_user_session(id,token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt

def generate_token(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'Invalid session. Please login again'})

    return JsonResponse({'clientToken':gateway.client_token.generate(),'Success':True})

@csrf_exempt

def procress_payment(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'Error':'Invalid session. Please login again'})

    

    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]

    result = gateway.transaction.sale({
        "amount":amount_from_the_client,
        "payment_method_nonce":nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })
    
    if result.is_success:
        return JsonResponse({
            'Success': result.is_success,
            'transaction':{'id':result.transaction.id,'amount':result.transaction.amount,
            'test':"helll"}
            })
    else:
        return JsonResponse({'error':True,'Success':False})