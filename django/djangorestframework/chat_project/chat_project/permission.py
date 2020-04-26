from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied, MethodNotAllowed


def owner_permission(self, model):
    request = self.request
    user_id = request.user.id
    if request.method in permissions.SAFE_METHODS:
        return True
    if not request.user.is_authenticated:
        return False
    if request.method == 'PUT':
        raise MethodNotAllowed('PUT')
    if request.method == 'POST':
        if int(request.POST['owner']) != user_id:
            raise PermissionDenied('owner in post data is not yours')
    if request.method in ('PATCH', 'DELETE'):
        original_project = model.objects.get(pk=self.kwargs['pk'])
        owner = original_project.owner.id
        if owner != user_id:
            raise PermissionDenied('you can not patch or delete data which other people made')
    return True
